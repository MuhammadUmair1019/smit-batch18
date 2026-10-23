import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';
import { AppError } from '../errors/app-error';

export function validateQuery(schema: ZodType): RequestHandler {
  return (request, _response, next) => {
    const result = schema.safeParse(request.query);
    if (!result.success) {
      next(new AppError('Query validation failed', 422, 'VALIDATION_ERROR'));
      return;
    }
    request.query = result.data as typeof request.query;
    next();
  };
}
