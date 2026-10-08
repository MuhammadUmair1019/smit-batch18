import type { Request, Response } from 'express';
import { AppError } from '../../shared/errors/app-error';
import { authService } from './auth.service';

function requireUserId(request: Request): string {
  if (!request.authUser) throw new AppError('Authentication is required', 401, 'AUTHENTICATION_REQUIRED');
  return request.authUser.id;
}

export const authController = {
  async register(request: Request, response: Response) {
    const data = await authService.register(request.body);
    response.status(201).json({ success: true, message: 'Registration successful', data });
  },

  async login(request: Request, response: Response) {
    const data = await authService.login(request.body);
    response.status(200).json({ success: true, message: 'Login successful', data });
  },

  async logout(request: Request, response: Response) {
    await authService.logout(requireUserId(request));
    response.status(200).json({ success: true, message: 'Logged out successfully', data: {} });
  },
};
