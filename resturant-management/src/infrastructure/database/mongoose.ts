import mongoose from 'mongoose';
import { env } from '../../config/env';
import { logger } from '../../shared/logger';

export async function connectDatabase(): Promise<void> {
  mongoose.set('strictQuery', true);
  await mongoose.connect(env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5_000,
    autoIndex: false,
  });
  logger.info('Connected to MongoDB');
}

export async function disconnectDatabase(): Promise<void> {
  await mongoose.disconnect();
  logger.info('Disconnected from MongoDB');
}

export function isDatabaseReady(): boolean {
  return mongoose.connection.readyState === 1;
}
