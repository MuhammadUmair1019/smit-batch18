import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import pinoHttp from 'pino-http';
import { env } from './config/env';
import { errorHandler, notFoundHandler } from './shared/http/error-handler';
import { requestIdMiddleware } from './shared/http/request-id';
import { logger } from './shared/logger';
import { isDatabaseReady } from './infrastructure/database/mongoose';
import { authRoutes } from './modules/auth/auth.routes';
import { userRoutes } from './modules/users/user.routes';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(requestIdMiddleware);
  app.use(pinoHttp({ logger }));
  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
  app.use(express.json({ limit: env.JSON_BODY_LIMIT }));

  app.get('/health/live', (_request, response) => {
    response.status(200).json({ success: true, data: { status: 'live' } });
  });

  app.get('/health/ready', (_request, response) => {
    const ready = isDatabaseReady();
    response.status(ready ? 200 : 503).json({
      success: ready,
      data: { status: ready ? 'ready' : 'not_ready', database: ready ? 'connected' : 'disconnected' },
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api', notFoundHandler);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
