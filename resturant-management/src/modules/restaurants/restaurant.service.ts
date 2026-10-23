import { Types } from 'mongoose';
import { AppError } from '../../shared/errors/app-error';
import { escapeRegExp, paginationMetadata } from '../../shared/http/pagination';
import { fromPaisa, toPaisa } from '../../shared/domain/money';
import { Category } from '../catalog/category.model';
import { MenuItem } from '../catalog/menu-item.model';
import { User } from '../users/user.model';
import { Restaurant } from './restaurant.model';

type Actor = { id: string; role: 'customer' | 'restaurant_admin' | 'super_admin' };

function publicRestaurant(restaurant: Record<string, any>, now = new Date()) {
  return {
    id: restaurant._id.toString(),
    name: restaurant.name,
    description: restaurant.description,
    phone: restaurant.phone,
    email: restaurant.email,
    address: restaurant.address,
    deliveryFee: fromPaisa(restaurant.deliveryFeePaisa),
    image: restaurant.image,
    openingHours: restaurant.openingHours,
    timeZone: restaurant.timeZone,
    isActive: restaurant.isActive,
    isOpen: isOpenNow(restaurant.openingHours, restaurant.timeZone, now),
    createdAt: restaurant.createdAt,
    updatedAt: restaurant.updatedAt,
  };
}

function isOpenNow(openingHours: Array<{ dayOfWeek: number; opensAt: string; closesAt: string; isClosed?: boolean }>, timeZone: string, now: Date): boolean {
  let parts: Record<string, string>;
  try {
    parts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    }).formatToParts(now).map((part) => [part.type, part.value]));
  } catch {
    return false;
  }

  const weekdays: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const currentDay = weekdays[parts.weekday];
  const currentMinutes = Number(parts.hour) * 60 + Number(parts.minute);
  const minutes = (value: string) => {
    const [hour, minute] = value.split(':').map(Number);
    return hour * 60 + minute;
  };

  return openingHours.some((entry) => {
    if (entry.isClosed) return false;
    const opensAt = minutes(entry.opensAt);
    const closesAt = minutes(entry.closesAt);
    if (closesAt > opensAt) {
      return currentDay === entry.dayOfWeek && currentMinutes >= opensAt && currentMinutes < closesAt;
    }
    return (currentDay === entry.dayOfWeek && currentMinutes >= opensAt) ||
      (currentDay === (entry.dayOfWeek + 1) % 7 && currentMinutes < closesAt);
  });
}

async function findManageableRestaurant(id: string, actor: Actor) {
  if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid restaurant ID', 400, 'INVALID_ID');
  const filter: Record<string, unknown> = { _id: id, deletedAt: null };
  if (actor.role === 'restaurant_admin') filter.ownerUserId = actor.id;
  const restaurant = await Restaurant.findOne(filter).exec();
  if (!restaurant) throw new AppError('Restaurant not found', 404, 'RESTAURANT_NOT_FOUND');
  return restaurant;
}

export const restaurantService = {
  async list(query: { page: number; limit: number; search?: string; city?: string; open?: 'true' | 'false' }) {
    const filter: Record<string, unknown> = { isActive: true, deletedAt: null };
    if (query.city) filter['address.city'] = new RegExp(`^${escapeRegExp(query.city)}$`, 'i');
    if (query.search) {
      const search = new RegExp(escapeRegExp(query.search), 'i');
      filter.$or = [{ name: search }, { description: search }, { 'address.city': search }];
    }

    const now = new Date();
    if (query.open === undefined) {
      const [records, total] = await Promise.all([
        Restaurant.find(filter).sort({ name: 1, _id: 1 }).skip((query.page - 1) * query.limit).limit(query.limit).lean().exec(),
        Restaurant.countDocuments(filter).exec(),
      ]);
      return {
        data: records.map((record) => publicRestaurant(record, now)),
        pagination: paginationMetadata(query.page, query.limit, total),
      };
    }

    const wantsOpen = query.open === 'true';
    const matching = (await Restaurant.find(filter).sort({ name: 1, _id: 1 }).lean().exec())
      .filter((record) => isOpenNow(record.openingHours, record.timeZone, now) === wantsOpen);
    const start = (query.page - 1) * query.limit;
    return {
      data: matching.slice(start, start + query.limit).map((record) => publicRestaurant(record, now)),
      pagination: paginationMetadata(query.page, query.limit, matching.length),
    };
  },

  async getPublic(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid restaurant ID', 400, 'INVALID_ID');
    const restaurant = await Restaurant.findOne({ _id: id, isActive: true, deletedAt: null }).lean().exec();
    if (!restaurant) throw new AppError('Restaurant not found', 404, 'RESTAURANT_NOT_FOUND');

    const [categories, menuItems, categoryCount, menuItemCount] = await Promise.all([
      Category.find({ restaurantId: id, isActive: true, deletedAt: null }).sort({ sortOrder: 1, name: 1 }).limit(100).lean().exec(),
      MenuItem.find({ restaurantId: id, isAvailable: true, deletedAt: null }).sort({ name: 1 }).limit(100).lean().exec(),
      Category.countDocuments({ restaurantId: id, isActive: true, deletedAt: null }).exec(),
      MenuItem.countDocuments({ restaurantId: id, isAvailable: true, deletedAt: null }).exec(),
    ]);

    return {
      restaurant: publicRestaurant(restaurant),
      categories: categories.map((category) => ({ id: category._id.toString(), name: category.name, description: category.description, image: category.image, sortOrder: category.sortOrder })),
      menuItems: menuItems.map((item) => ({
        id: item._id.toString(),
        categoryId: item.categoryId.toString(),
        name: item.name,
        description: item.description,
        price: fromPaisa(item.pricePaisa),
        discountPrice: item.discountPricePaisa == null ? undefined : fromPaisa(item.discountPricePaisa),
        image: item.image,
        ingredients: item.ingredients,
        isAvailable: item.isAvailable,
        preparationTimeMinutes: item.preparationTimeMinutes,
      })),
      catalogTruncated: categoryCount > categories.length || menuItemCount > menuItems.length,
    };
  },

  async create(actor: Actor, input: Record<string, any>) {
    let ownerUserId = actor.id;
    if (input.ownerUserId) {
      if (actor.role !== 'super_admin') throw new AppError('Only a super admin can assign a restaurant owner', 403, 'FORBIDDEN');
      const owner = await User.findOne({ _id: input.ownerUserId, role: 'restaurant_admin', status: 'active', deletedAt: null }).exec();
      if (!owner) throw new AppError('Active restaurant admin not found', 422, 'INVALID_RESTAURANT_OWNER');
      ownerUserId = owner._id.toString();
    }

    const { ownerUserId: _ignoredOwner, deliveryFee, ...fields } = input;
    const restaurant = await Restaurant.create({
      ...fields,
      deliveryFeePaisa: toPaisa(deliveryFee),
      ownerUserId,
      createdBy: actor.id,
      updatedBy: actor.id,
    });
    return publicRestaurant(restaurant.toObject());
  },

  async update(id: string, actor: Actor, input: Record<string, any>) {
    if (actor.role === 'restaurant_admin' && 'isActive' in input) {
      throw new AppError('Only a super admin can change restaurant activation', 403, 'FORBIDDEN');
    }
    const restaurant = await findManageableRestaurant(id, actor);
    const { deliveryFee, ...fields } = input;
    Object.assign(restaurant, fields, {
      ...(deliveryFee === undefined ? {} : { deliveryFeePaisa: toPaisa(deliveryFee) }),
      updatedBy: actor.id,
    });
    await restaurant.save();
    return publicRestaurant(restaurant.toObject());
  },

  async deactivate(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid restaurant ID', 400, 'INVALID_ID');
    const restaurant = await Restaurant.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: { isActive: false, deletedAt: new Date() } },
      { new: true, runValidators: true },
    ).exec();
    if (!restaurant) throw new AppError('Restaurant not found', 404, 'RESTAURANT_NOT_FOUND');
    return publicRestaurant(restaurant.toObject());
  },

  async assertManageAccess(id: string, actor: Actor) {
    return findManageableRestaurant(id, actor);
  },
};
