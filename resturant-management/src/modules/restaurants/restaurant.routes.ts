import { Router } from 'express';
import { asyncHandler } from '../../shared/http/async-handler';
import { validateBody } from '../../shared/http/validate-body';
import { validateQuery } from '../../shared/http/validate-query';
import { authenticate, authorize } from '../auth/auth.middleware';
import { restaurantController } from './restaurant.controller';
import { createRestaurantSchema, restaurantListQuerySchema, updateRestaurantSchema } from './restaurant.validation';

const router = Router();
router.get('/', validateQuery(restaurantListQuerySchema), asyncHandler(restaurantController.list));
router.get('/:restaurantId', asyncHandler(restaurantController.get));
router.post('/', authenticate, authorize('restaurant_admin', 'super_admin'), validateBody(createRestaurantSchema), asyncHandler(restaurantController.create));
router.patch('/:restaurantId', authenticate, authorize('restaurant_admin', 'super_admin'), validateBody(updateRestaurantSchema), asyncHandler(restaurantController.update));
router.delete('/:restaurantId', authenticate, authorize('super_admin'), asyncHandler(restaurantController.deactivate));

export { router as restaurantRoutes };
