import { AppError } from '../errors/app-error';

export type Pagination = { page: number; limit: number; skip: number };

export function parsePagination(query: Record<string, unknown>): Pagination {
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? 20 : Number(query.limit);
  if (!Number.isSafeInteger(page) || page < 1 || !Number.isSafeInteger(limit) || limit < 1 || limit > 100) {
    throw new AppError('Pagination must use a positive page and a limit from 1 to 100', 422, 'INVALID_PAGINATION');
  }
  return { page, limit, skip: (page - 1) * limit };
}

export function paginationMetadata(page: number, limit: number, total: number) {
  return { page, limit, total, totalPages: Math.ceil(total / limit) };
}

export function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
