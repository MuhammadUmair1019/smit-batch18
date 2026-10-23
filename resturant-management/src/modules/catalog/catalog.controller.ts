import type { Request, Response } from 'express';
import type { z } from 'zod';
import { AppError } from '../../shared/errors/app-error';
import { paginationMetadata } from '../../shared/http/pagination';
import { catalogService } from './catalog.service';
import { categoryListQuerySchema, menuListQuerySchema } from './catalog.validation';

function requireActor(request: Request) {
  if (!request.authUser) throw new AppError('Authentication is required', 401, 'AUTHENTICATION_REQUIRED');
  return request.authUser;
}

export const catalogController = {
  async listCategories(request: Request, response: Response) {
    const query = request.query as unknown as z.infer<typeof categoryListQuerySchema>;
    const result = await catalogService.listCategories(request.params.restaurantId, query);
    response.status(200).json({ success: true, message: 'Categories fetched successfully', ...result });
  },

  async getCategory(request: Request, response: Response) {
    const data = await catalogService.getCategory(request.params.categoryId);
    response.status(200).json({ success: true, message: 'Category fetched successfully', data });
  },

  async createCategory(request: Request, response: Response) {
    const data = await catalogService.createCategory(request.params.restaurantId, requireActor(request), request.body);
    response.status(201).json({ success: true, message: 'Category created successfully', data });
  },

  async updateCategory(request: Request, response: Response) {
    const data = await catalogService.updateCategory(request.params.categoryId, requireActor(request), request.body);
    response.status(200).json({ success: true, message: 'Category updated successfully', data });
  },

  async deleteCategory(request: Request, response: Response) {
    const data = await catalogService.deleteCategory(request.params.categoryId, requireActor(request));
    response.status(200).json({ success: true, message: 'Category deleted successfully', data });
  },

  async listMenu(request: Request, response: Response) {
    const query = request.query as unknown as z.infer<typeof menuListQuerySchema>;
    const result = await catalogService.listMenu(request.params.restaurantId, query);
    response.status(200).json({ success: true, message: 'Menu fetched successfully', ...result });
  },

  async getMenuItem(request: Request, response: Response) {
    const data = await catalogService.getMenuItem(request.params.menuItemId);
    response.status(200).json({ success: true, message: 'Menu item fetched successfully', data });
  },

  async createMenuItem(request: Request, response: Response) {
    const data = await catalogService.createMenuItem(request.params.restaurantId, requireActor(request), request.body);
    response.status(201).json({ success: true, message: 'Menu item created successfully', data });
  },

  async updateMenuItem(request: Request, response: Response) {
    const data = await catalogService.updateMenuItem(request.params.menuItemId, requireActor(request), request.body);
    response.status(200).json({ success: true, message: 'Menu item updated successfully', data });
  },

  async setAvailability(request: Request, response: Response) {
    const data = await catalogService.setAvailability(request.params.menuItemId, requireActor(request), request.body.isAvailable);
    response.status(200).json({ success: true, message: 'Menu availability updated successfully', data });
  },

  async deleteMenuItem(request: Request, response: Response) {
    const data = await catalogService.deleteMenuItem(request.params.menuItemId, requireActor(request));
    response.status(200).json({ success: true, message: 'Menu item deleted successfully', data });
  },
};
