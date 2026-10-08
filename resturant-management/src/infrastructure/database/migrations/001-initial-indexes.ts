import type { Db } from 'mongodb';
import { Cart } from '../../../modules/cart/cart.model';
import { Category } from '../../../modules/catalog/category.model';
import { MenuItem } from '../../../modules/catalog/menu-item.model';
import { Order } from '../../../modules/orders/order.model';
import { Restaurant } from '../../../modules/restaurants/restaurant.model';
import { User } from '../../../modules/users/user.model';

export const initialIndexesMigration = {
  id: '001-initial-indexes',
  async up(_db: Db): Promise<void> {
    await Promise.all([
      User.createIndexes(),
      Restaurant.createIndexes(),
      Category.createIndexes(),
      MenuItem.createIndexes(),
      Cart.createIndexes(),
      Order.createIndexes(),
    ]);
  },
};
