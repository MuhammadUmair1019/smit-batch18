import type { Request, Response } from 'express';
import { AppError } from '../../shared/errors/app-error';
import { authService } from '../auth/auth.service';

function requireUserId(request: Request): string {
  if (!request.authUser) throw new AppError('Authentication is required', 401, 'AUTHENTICATION_REQUIRED');
  return request.authUser.id;
}

export const userController = {
  async getMe(request: Request, response: Response) {
    const user = await authService.getCurrentUser(requireUserId(request));
    response.status(200).json({ success: true, message: 'Current user fetched successfully', data: user });
  },

  async updateMe(request: Request, response: Response) {
    const user = await authService.updateProfile(requireUserId(request), request.body);
    response.status(200).json({ success: true, message: 'Profile updated successfully', data: user });
  },

  async changePassword(request: Request, response: Response) {
    await authService.changePassword(requireUserId(request), request.body);
    response.status(200).json({ success: true, message: 'Password changed successfully; sign in again', data: {} });
  },
};
