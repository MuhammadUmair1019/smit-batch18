import { z } from 'zod';

const passwordSchema = z.string().min(8).max(72);

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254).toLowerCase(),
  password: passwordSchema,
  phone: z.string().trim().min(7).max(32),
}).strict();

export const loginSchema = z.object({
  email: z.string().trim().email().max(254).toLowerCase(),
  password: z.string().min(1).max(72),
}).strict();

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(120).optional(),
  phone: z.string().trim().min(7).max(32).optional(),
}).strict().refine((value) => Object.keys(value).length > 0, 'Provide at least one field to update');

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(72),
  newPassword: passwordSchema,
}).strict().refine((value) => value.currentPassword !== value.newPassword, {
  message: 'New password must differ from current password',
  path: ['newPassword'],
});
