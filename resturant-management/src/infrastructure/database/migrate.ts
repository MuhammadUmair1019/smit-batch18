import { connectDatabase, disconnectDatabase } from './mongoose';
import { initialIndexesMigration } from './migrations/001-initial-indexes';
import { logger } from '../../shared/logger';

async function runMigrations(): Promise<void> {
  await connectDatabase();
  const db = (await import('mongoose')).default.connection.db;
  if (!db) throw new Error('MongoDB connection is not ready');

  const migrationCollection = db.collection<{ _id: string; appliedAt: Date }>('schema_migrations');
  const migration = initialIndexesMigration;
  const alreadyApplied = await migrationCollection.findOne({ _id: migration.id });

  if (alreadyApplied) {
    logger.info({ migrationId: migration.id }, 'Migration already applied');
    return;
  }

  await migration.up(db);
  await migrationCollection.insertOne({ _id: migration.id, appliedAt: new Date() });
  logger.info({ migrationId: migration.id }, 'Migration applied');
}

void runMigrations()
  .catch((error: unknown) => {
    logger.fatal({ err: error }, 'Database migration failed');
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectDatabase();
  });
