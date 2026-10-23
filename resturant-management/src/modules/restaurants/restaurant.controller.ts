import type { Request, Response } from 'express';
import { AppError } from '../../shared/errors/app-error';
import { paginationMetadata } from '../../shared/http/pagination';
import { restaurantService } from './restaurant.service';
import type { z } from 'zod';
import { restaurantListQuerySchema } from './restaurant.validation';

function requireActor(request: Request) {
  if (!request.authUser) throw new AppError('Authentication is required', 401, 'AUTHENTICATION_REQUIRED');
  return request.authUser;
}

export const restaurantController = {
  async list(request: Request, response: Response) {
    const query = request.query as unknown as z.infer<typeof restaurantListQuerySchema>;
    const result = await restaurantService.list(query);
    response.status(200).json({ success: true, message: 'Restaurants fetched successfully', ...result });
  },

  async get(request: Request, response: Response) {
    const data = await restaurantService.getPublic(request.params.restaurantId);
    response.status(200).json({ success: true, message: 'Restaurant fetched successfully', data });
  },

  async create(request: Request, response: Response) {
    const data = await restaurantService.create(requireActor(request), request.body);
    response.status(201).json({ success: true, message: 'Restaurant created successfully', data });
  },

  async update(request: Request, response: Response) {
    const data = await restaurantService.update(request.params.restaurantId, requireActor(request), request.body);
    response.status(200).json({ success: true, message: 'Restaurant updated successfully', data });
  },

  async deactivate(request: Request, response: Response) {
    const data = await restaurantService.deactivate(request.params.restaurantId);
    response.status(200).json({ success: true, message: 'Restaurant deactivated successfully', data });
  },
};
