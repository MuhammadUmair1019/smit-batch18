import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { connectDatabase, disconnectDatabase } from './mongoose';
import { Category } from '../../modules/catalog/category.model';
import { MenuItem } from '../../modules/catalog/menu-item.model';
import { Restaurant } from '../../modules/restaurants/restaurant.model';
import { User } from '../../modules/users/user.model';
import { logger } from '../../shared/logger';

const sampleAccounts = [
  { name: 'Local Super Admin', email: 'superadmin@example.test', role: 'super_admin' as const },
  { name: 'Restaurant Admin One', email: 'restaurant-admin-1@example.test', role: 'restaurant_admin' as const },
  { name: 'Restaurant Admin Two', email: 'restaurant-admin-2@example.test', role: 'restaurant_admin' as const },
  { name: 'Customer One', email: 'customer-1@example.test', role: 'customer' as const },
  { name: 'Customer Two', email: 'customer-2@example.test', role: 'customer' as const },
  { name: 'Customer Three', email: 'customer-3@example.test', role: 'customer' as const },
];

const restaurantFixtures = [
  { name: 'Karachi Pizza House', city: 'Karachi', ownerEmail: 'restaurant-admin-1@example.test' },
  { name: 'Lahore Burger Kitchen', city: 'Lahore', ownerEmail: 'restaurant-admin-1@example.test' },
  { name: 'Islamabad Grill', city: 'Islamabad', ownerEmail: 'restaurant-admin-2@example.test' },
];

const categoryNames = ['Pizza', 'Burgers', 'Meals', 'Drinks', 'Desserts'];
const menuFixtures = [
  { name: 'House Special', category: 'Pizza', pricePaisa: 125_000 },
  { name: 'Classic Margherita', category: 'Pizza', pricePaisa: 95_000 },
  { name: 'Smoky BBQ Pizza', category: 'Pizza', pricePaisa: 135_000 },
  { name: 'Crispy Chicken Burger', category: 'Burgers', pricePaisa: 75_000 },
  { name: 'Double Cheese Burger', category: 'Burgers', pricePaisa: 88_000 },
  { name: 'Grilled Chicken Meal', category: 'Meals', pricePaisa: 165_000 },
  { name: 'Spicy Rice Bowl', category: 'Meals', pricePaisa: 145_000 },
  { name: 'Fresh Lemonade', category: 'Drinks', pricePaisa: 30_000 },
  { name: 'Chocolate Brownie', category: 'Desserts', pricePaisa: 45_000 },
  { name: 'Vanilla Milkshake', category: 'Drinks', pricePaisa: 55_000 },
];

function getSeedConfiguration() {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('The seed command is disabled in production');
  }

  const password = process.env.SEED_PASSWORD;
  if (!password || password.length < 8 || password.length > 72) {
    throw new Error('Set SEED_PASSWORD to a value between 8 and 72 characters');
  }

  const rawDeliveryFee = process.env.SEED_DELIVERY_FEE_PAISA;
  if (!rawDeliveryFee?.trim()) {
    throw new Error('Set SEED_DELIVERY_FEE_PAISA to a nonnegative integer amount in paisa');
  }
  const deliveryFeePaisa = Number(rawDeliveryFee);
  if (!Number.isSafeInteger(deliveryFeePaisa) || deliveryFeePaisa < 0) {
    throw new Error('Set SEED_DELIVERY_FEE_PAISA to a nonnegative integer amount in paisa');
  }

  return { password, deliveryFeePaisa };
}

async function seed(): Promise<void> {
  const { password, deliveryFeePaisa } = getSeedConfiguration();
  await connectDatabase();

  const passwordHash = await bcrypt.hash(password, 12);
  const users = new Map<string, InstanceType<typeof User>>();

  for (const account of sampleAccounts) {
    const user = await User.findOneAndUpdate(
      { email: account.email },
      {
        $setOnInsert: {
          name: account.name,
          email: account.email,
          passwordHash,
          role: account.role,
          status: 'active',
          tokenVersion: 0,
        },
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    ).exec();

    if (user.role !== account.role) {
      throw new Error(`Seed account ${account.email} already exists with a different role`);
    }
    users.set(account.email, user);
  }

  for (const fixture of restaurantFixtures) {
    const owner = users.get(fixture.ownerEmail);
    if (!owner) throw new Error(`Seed owner ${fixture.ownerEmail} was not created`);

    const restaurant = await Restaurant.findOneAndUpdate(
      { name: fixture.name },
      {
        $set: {
          ownerUserId: owner._id,
          address: {
            line1: `Main Road, ${fixture.city}`,
            city: fixture.city,
            postalCode: '00000',
            country: 'Pakistan',
          },
          deliveryFeePaisa,
          openingHours: Array.from({ length: 7 }, (_, dayOfWeek) => ({
            dayOfWeek,
            opensAt: '10:00',
            closesAt: '22:00',
            isClosed: false,
          })),
          timeZone: 'Asia/Karachi',
          isActive: true,
          deletedAt: null,
        },
        $setOnInsert: {
          name: fixture.name,
          createdBy: users.get('superadmin@example.test')?._id,
        },
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
    ).exec();

    const categories = new Map<string, InstanceType<typeof Category>>();
    for (const name of categoryNames) {
      const normalizedName = name.trim().toLocaleLowerCase('en');
      const category = await Category.findOneAndUpdate(
        { restaurantId: restaurant._id, normalizedName },
        { $setOnInsert: { restaurantId: restaurant._id, name, normalizedName, sortOrder: categoryNames.indexOf(name) } },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ).exec();
      categories.set(name, category);
    }

    for (const [index, item] of menuFixtures.entries()) {
      const category = categories.get(item.category);
      if (!category) throw new Error(`Seed category ${item.category} was not created`);

      await MenuItem.findOneAndUpdate(
        { restaurantId: restaurant._id, name: item.name },
        {
          $setOnInsert: {
            restaurantId: restaurant._id,
            categoryId: category._id,
            name: item.name,
            description: `${item.name}, prepared fresh to order.`,
            pricePaisa: item.pricePaisa,
            ingredients: ['House ingredients'],
            isAvailable: true,
            preparationTimeMinutes: 15 + (index % 3) * 5,
            createdBy: owner._id,
          },
        },
        { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true },
      ).exec();
    }
  }

  logger.info({
    users: sampleAccounts.length,
    restaurants: restaurantFixtures.length,
    categoriesPerRestaurant: categoryNames.length,
    menuItemsPerRestaurant: menuFixtures.length,
  }, 'Development seed data is ready');
}

void seed()
  .catch((error: unknown) => {
    logger.fatal({ err: error }, 'Database seeding failed');
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
