import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError } from '../errors/app-error';
import { logger } from '../logger';

export const notFoundHandler: RequestHandler = (request, response) => {
  response.status(404).json({
    success: false,
    message: 'Route not found',
    errors: [{ code: 'ROUTE_NOT_FOUND' }],
    requestId: request.requestId,
  });
};

export const errorHandler: ErrorRequestHandler = (error: unknown, request, response, _next) => {
  const knownError = error instanceof AppError ? error : undefined;
  const statusCode = knownError?.statusCode ?? 500;
  const code = knownError?.code ?? 'INTERNAL_SERVER_ERROR';
  const message = knownError?.message ?? 'An unexpected error occurred';

  if (statusCode >= 500) {
    logger.error({ err: error, requestId: request.requestId }, 'Request failed');
  } else {
    logger.warn({ err: error, requestId: request.requestId, statusCode }, 'Request rejected');
  }

  response.status(statusCode).json({
    success: false,
    message,
    errors: [{ code }],
    requestId: request.requestId,
  });
};
