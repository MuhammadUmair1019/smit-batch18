import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { asyncHandler } from '../../shared/http/async-handler';
import { validateBody } from '../../shared/http/validate-body';
import { authenticate } from './auth.middleware';
import { authController } from './auth.controller';
import { loginSchema, registerSchema } from './auth.validation';

const router = Router();
const authRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (request, response) => {
    response.status(429).json({
      success: false,
      message: 'Too many authentication attempts. Try again later.',
      errors: [{ code: 'RATE_LIMITED' }],
      requestId: request.requestId,
    });
  },
});

router.post('/register', authRateLimit, validateBody(registerSchema), asyncHandler(authController.register));
router.post('/login', authRateLimit, validateBody(loginSchema), asyncHandler(authController.login));
router.post('/logout', authenticate, asyncHandler(authController.logout));

export { router as authRoutes };
