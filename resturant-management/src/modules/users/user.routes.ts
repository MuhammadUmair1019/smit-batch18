import { Router } from 'express';
import { asyncHandler } from '../../shared/http/async-handler';
import { validateBody } from '../../shared/http/validate-body';
import { authenticate } from '../auth/auth.middleware';
import { changePasswordSchema, updateProfileSchema } from '../auth/auth.validation';
import { userController } from './user.controller';

const router = Router();
router.use(authenticate);
router.get('/me', asyncHandler(userController.getMe));
router.patch('/me', validateBody(updateProfileSchema), asyncHandler(userController.updateMe));
router.patch('/change-password', validateBody(changePasswordSchema), asyncHandler(userController.changePassword));

export { router as userRoutes };
