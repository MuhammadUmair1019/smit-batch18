import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { AppError } from '../errors/app-error';

export function validateBody(schema: ZodType): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request.body);
    if (!result.success) {
      next(new AppError('Request validation failed', 422, 'VALIDATION_ERROR'));
      return;
    }
    request.body = result.data;
    next();
  };
}
