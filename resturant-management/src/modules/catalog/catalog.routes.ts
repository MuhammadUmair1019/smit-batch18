import { Router } from 'express';
import { asyncHandler } from '../../shared/http/async-handler';
import { validateBody } from '../../shared/http/validate-body';
import { validateQuery } from '../../shared/http/validate-query';
import { authenticate, authorize } from '../auth/auth.middleware';
import { catalogController } from './catalog.controller';
import {
  availabilitySchema,
  categoryListQuerySchema,
  createCategorySchema,
  createMenuItemSchema,
  menuListQuerySchema,
  updateCategorySchema,
  updateMenuItemSchema,
} from './catalog.validation';

const router = Router();
const restaurantManagers = [authenticate, authorize('restaurant_admin', 'super_admin')];

router.get('/restaurants/:restaurantId/categories', validateQuery(categoryListQuerySchema), asyncHandler(catalogController.listCategories));
router.post('/restaurants/:restaurantId/categories', ...restaurantManagers, validateBody(createCategorySchema), asyncHandler(catalogController.createCategory));
router.get('/categories/:categoryId', asyncHandler(catalogController.getCategory));
router.patch('/categories/:categoryId', ...restaurantManagers, validateBody(updateCategorySchema), asyncHandler(catalogController.updateCategory));
router.delete('/categories/:categoryId', ...restaurantManagers, asyncHandler(catalogController.deleteCategory));

router.get('/restaurants/:restaurantId/menu', validateQuery(menuListQuerySchema), asyncHandler(catalogController.listMenu));
router.post('/restaurants/:restaurantId/menu', ...restaurantManagers, validateBody(createMenuItemSchema), asyncHandler(catalogController.createMenuItem));
router.get('/menu/:menuItemId', asyncHandler(catalogController.getMenuItem));
router.patch('/menu/:menuItemId/availability', ...restaurantManagers, validateBody(availabilitySchema), asyncHandler(catalogController.setAvailability));
router.patch('/menu/:menuItemId', ...restaurantManagers, validateBody(updateMenuItemSchema), asyncHandler(catalogController.updateMenuItem));
router.delete('/menu/:menuItemId', ...restaurantManagers, asyncHandler(catalogController.deleteMenuItem));

export { router as catalogRoutes };
