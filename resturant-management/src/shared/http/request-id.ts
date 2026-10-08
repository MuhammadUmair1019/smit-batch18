import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

export const requestIdMiddleware: RequestHandler = (request, response, next) => {
  const suppliedId = request.header('x-request-id');
  const requestId = suppliedId && /^[\w-]{1,100}$/.test(suppliedId) ? suppliedId : randomUUID();
  request.requestId = requestId;
  response.setHeader('x-request-id', requestId);
  next();
};
