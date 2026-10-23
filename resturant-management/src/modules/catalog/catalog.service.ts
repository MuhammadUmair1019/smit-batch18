import { Types } from 'mongoose';
import mongoose from 'mongoose';
import { AppError } from '../../shared/errors/app-error';
import { escapeRegExp, paginationMetadata } from '../../shared/http/pagination';
import { fromPaisa, toPaisa } from '../../shared/domain/money';
import { Restaurant } from '../restaurants/restaurant.model';
import { User } from '../users/user.model';
import { Category } from './category.model';
import { MenuItem } from './menu-item.model';

type Actor = { id: string; role: 'customer' | 'restaurant_admin' | 'super_admin' };

function categoryResponse(category: Record<string, any>) {
  return {
    id: category._id.toString(),
    restaurantId: category.restaurantId.toString(),
    name: category.name,
    description: category.description,
    image: category.image,
    sortOrder: category.sortOrder,
    isActive: category.isActive,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
}

function menuItemResponse(item: Record<string, any>) {
  return {
    id: item._id.toString(),
    restaurantId: item.restaurantId.toString(),
    categoryId: item.categoryId.toString(),
    name: item.name,
    description: item.description,
    price: fromPaisa(item.pricePaisa),
    discountPrice: item.discountPricePaisa == null ? undefined : fromPaisa(item.discountPricePaisa),
    image: item.image,
    ingredients: item.ingredients,
    isAvailable: item.isAvailable,
    preparationTimeMinutes: item.preparationTimeMinutes,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
}

async function requireRestaurant(id: string, actor?: Actor) {
  if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid restaurant ID', 400, 'INVALID_ID');
  const filter: Record<string, unknown> = { _id: id, isActive: true, deletedAt: null };
  if (actor?.role === 'restaurant_admin') filter.ownerUserId = actor.id;
  const restaurant = await Restaurant.findOne(filter).exec();
  if (!restaurant) throw new AppError('Restaurant not found', 404, 'RESTAURANT_NOT_FOUND');
  return restaurant;
}

async function findManageableCategory(id: string, actor: Actor) {
  if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid category ID', 400, 'INVALID_ID');
  const category = await Category.findOne({ _id: id, deletedAt: null }).exec();
  if (!category) throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
  await requireRestaurant(category.restaurantId.toString(), actor);
  return category;
}

async function findManageableMenuItem(id: string, actor: Actor) {
  if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid menu item ID', 400, 'INVALID_ID');
  const item = await MenuItem.findOne({ _id: id, deletedAt: null }).exec();
  if (!item) throw new AppError('Menu item not found', 404, 'MENU_ITEM_NOT_FOUND');
  await requireRestaurant(item.restaurantId.toString(), actor);
  return item;
}

export const catalogService = {
  async listCategories(restaurantId: string, pagination: { page: number; limit: number }) {
    await requireRestaurant(restaurantId);
    const filter = { restaurantId, isActive: true, deletedAt: null };
    const [records, total] = await Promise.all([
      Category.find(filter).sort({ sortOrder: 1, name: 1 }).skip((pagination.page - 1) * pagination.limit).limit(pagination.limit).lean().exec(),
      Category.countDocuments(filter).exec(),
    ]);
    return { data: records.map(categoryResponse), pagination: paginationMetadata(pagination.page, pagination.limit, total) };
  },

  async getCategory(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid category ID', 400, 'INVALID_ID');
    const category = await Category.findOne({ _id: id, isActive: true, deletedAt: null }).lean().exec();
    if (!category) throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
    await requireRestaurant(category.restaurantId.toString());
    return categoryResponse(category);
  },

  async createCategory(restaurantId: string, actor: Actor, input: Record<string, any>) {
    const restaurant = await requireRestaurant(restaurantId, actor);
    const normalizedName = input.name.trim().toLocaleLowerCase('en');
    const duplicate = await Category.findOne({ restaurantId: restaurant._id, normalizedName, deletedAt: null }).exec();
    if (duplicate) throw new AppError('Category name already exists for this restaurant', 409, 'CATEGORY_NAME_EXISTS');
    const category = await Category.create({
      ...input,
      restaurantId: restaurant._id,
      normalizedName,
      createdBy: actor.id,
      updatedBy: actor.id,
    });
    return categoryResponse(category.toObject());
  },

  async updateCategory(id: string, actor: Actor, input: Record<string, any>) {
    const category = await findManageableCategory(id, actor);
    if (input.name !== undefined) {
      const normalizedName = input.name.trim().toLocaleLowerCase('en');
      const duplicate = await Category.findOne({
        _id: { $ne: category._id }, restaurantId: category.restaurantId, normalizedName, deletedAt: null,
      }).exec();
      if (duplicate) throw new AppError('Category name already exists for this restaurant', 409, 'CATEGORY_NAME_EXISTS');
      category.name = input.name;
      category.normalizedName = normalizedName;
    }
    Object.assign(category, { ...input, name: category.name, normalizedName: category.normalizedName, updatedBy: actor.id });
    await category.save();
    return categoryResponse(category.toObject());
  },

  async deleteCategory(id: string, actor: Actor) {
    const category = await findManageableCategory(id, actor);
    const session = await mongoose.startSession();
    let deletedCategory: typeof category | null = null;
    try {
      await session.withTransaction(async () => {
        deletedCategory = await Category.findOneAndUpdate(
          { _id: category._id, deletedAt: null },
          { $set: { deletedAt: new Date(), isActive: false, updatedBy: actor.id } },
          { new: true, runValidators: true, session },
        ).exec();
        if (!deletedCategory) throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
        await MenuItem.updateMany(
          { categoryId: category._id, deletedAt: null },
          { $set: { isAvailable: false, updatedBy: actor.id } },
          { session },
        ).exec();
      });
    } finally {
      await session.endSession();
    }
    return categoryResponse(deletedCategory!.toObject());
  },

  async listMenu(restaurantId: string, query: {
    page: number; limit: number; category?: string; search?: string; minPrice?: number; maxPrice?: number; available?: 'true' | 'false';
  }) {
    await requireRestaurant(restaurantId);
    const filter: Record<string, unknown> = { restaurantId, deletedAt: null };
    if (query.category) {
      if (!Types.ObjectId.isValid(query.category)) throw new AppError('Invalid category ID', 400, 'INVALID_ID');
      const category = await Category.findOne({ _id: query.category, restaurantId, isActive: true, deletedAt: null }).exec();
      if (!category) throw new AppError('Category not found', 404, 'CATEGORY_NOT_FOUND');
      filter.categoryId = category._id;
    }
    filter.isAvailable = query.available === 'false' ? false : true;
    if (query.search) filter.name = new RegExp(escapeRegExp(query.search), 'i');
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      const range: Record<string, number> = {};
      if (query.minPrice !== undefined) range.$gte = toPaisa(query.minPrice);
      if (query.maxPrice !== undefined) range.$lte = toPaisa(query.maxPrice);
      filter.pricePaisa = range;
    }

    const [records, total] = await Promise.all([
      MenuItem.find(filter).sort({ name: 1, _id: 1 }).skip((query.page - 1) * query.limit).limit(query.limit).lean().exec(),
      MenuItem.countDocuments(filter).exec(),
    ]);
    return { data: records.map(menuItemResponse), pagination: paginationMetadata(query.page, query.limit, total) };
  },

  async getMenuItem(id: string) {
    if (!Types.ObjectId.isValid(id)) throw new AppError('Invalid menu item ID', 400, 'INVALID_ID');
    const item = await MenuItem.findOne({ _id: id, isAvailable: true, deletedAt: null }).lean().exec();
    if (!item) throw new AppError('Menu item not found', 404, 'MENU_ITEM_NOT_FOUND');
    const category = await Category.findOne({ _id: item.categoryId, isActive: true, deletedAt: null }).lean().exec();
    if (!category) throw new AppError('Menu item not found', 404, 'MENU_ITEM_NOT_FOUND');
    await requireRestaurant(item.restaurantId.toString());
    return menuItemResponse(item);
  },

  async createMenuItem(restaurantId: string, actor: Actor, input: Record<string, any>) {
    const restaurant = await requireRestaurant(restaurantId, actor);
    const category = await Category.findOne({ _id: input.categoryId, restaurantId: restaurant._id, isActive: true, deletedAt: null }).exec();
    if (!category) throw new AppError('Active category not found for this restaurant', 422, 'INVALID_CATEGORY');
    const item = await MenuItem.create({
      ...input,
      restaurantId: restaurant._id,
      categoryId: category._id,
      pricePaisa: toPaisa(input.price),
      ...(input.discountPrice === undefined ? {} : { discountPricePaisa: toPaisa(input.discountPrice) }),
      createdBy: actor.id,
      updatedBy: actor.id,
    });
    return menuItemResponse(item.toObject());
  },

  async updateMenuItem(id: string, actor: Actor, input: Record<string, any>) {
    const item = await findManageableMenuItem(id, actor);
    const categoryId = input.categoryId ?? item.categoryId.toString();
    const category = await Category.findOne({ _id: categoryId, restaurantId: item.restaurantId, isActive: true, deletedAt: null }).exec();
    if (!category) throw new AppError('Active category not found for this restaurant', 422, 'INVALID_CATEGORY');

    const nextPrice = input.price === undefined ? item.pricePaisa : toPaisa(input.price);
    const nextDiscount = input.discountPrice === undefined
      ? item.discountPricePaisa
      : (input.discountPrice === null ? undefined : toPaisa(input.discountPrice));
    if (nextDiscount != null && nextDiscount >= nextPrice) {
      throw new AppError('Discount price must be lower than regular price', 422, 'INVALID_DISCOUNT_PRICE');
    }

    const { price: _price, discountPrice: _discountPrice, ...fields } = input;
    Object.assign(item, fields, {
      categoryId: category._id,
      pricePaisa: nextPrice,
      discountPricePaisa: nextDiscount,
      updatedBy: actor.id,
    });
    await item.save();
    return menuItemResponse(item.toObject());
  },

  async setAvailability(id: string, actor: Actor, isAvailable: boolean) {
    const item = await findManageableMenuItem(id, actor);
    if (isAvailable) {
      const category = await Category.findOne({ _id: item.categoryId, isActive: true, deletedAt: null }).exec();
      if (!category) throw new AppError('Cannot enable an item in an inactive category', 409, 'CATEGORY_INACTIVE');
    }
    item.isAvailable = isAvailable;
    item.updatedBy = new Types.ObjectId(actor.id);
    await item.save();
    return menuItemResponse(item.toObject());
  },

  async deleteMenuItem(id: string, actor: Actor) {
    const item = await findManageableMenuItem(id, actor);
    item.isAvailable = false;
    item.deletedAt = new Date();
    item.updatedBy = new Types.ObjectId(actor.id);
    await item.save();
    return menuItemResponse(item.toObject());
  },
};
