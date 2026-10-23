import { z } from 'zod';

const imageSchema = z.object({
  provider: z.string().trim().max(40).optional(),
  assetId: z.string().trim().max(200).optional(),
  url: z.string().url().max(2048).optional(),
}).strict();

export const createCategorySchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().max(1000).optional(),
  image: imageSchema.optional(),
  sortOrder: z.number().int().min(0).max(10000).optional(),
}).strict();

export const updateCategorySchema = createCategorySchema.partial().refine((value) => Object.keys(value).length > 0, 'Provide at least one field to update');

const menuFields = {
  categoryId: z.string().regex(/^[a-f\d]{24}$/i),
  name: z.string().trim().min(1).max(160),
  description: z.string().trim().max(2000).optional(),
  price: z.number().positive().max(1_000_000),
  discountPrice: z.number().positive().max(1_000_000).optional(),
  image: imageSchema.optional(),
  ingredients: z.array(z.string().trim().min(1).max(100)).max(50).optional(),
  preparationTimeMinutes: z.number().int().min(1).max(1440).optional(),
};

export const createMenuItemSchema = z.object(menuFields).strict().refine(
  (item) => item.discountPrice === undefined || item.discountPrice < item.price,
  { message: 'Discount price must be lower than regular price', path: ['discountPrice'] },
);

export const updateMenuItemSchema = z.object({
  categoryId: menuFields.categoryId.optional(),
  name: menuFields.name.optional(),
  description: menuFields.description,
  price: menuFields.price.optional(),
  discountPrice: menuFields.discountPrice,
  image: menuFields.image,
  ingredients: menuFields.ingredients,
  preparationTimeMinutes: menuFields.preparationTimeMinutes,
}).strict().refine((value) => Object.keys(value).length > 0, 'Provide at least one field to update');

export const availabilitySchema = z.object({ isAvailable: z.boolean() }).strict();

export const categoryListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(100),
}).strict();

export const menuListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  category: z.string().regex(/^[a-f\d]{24}$/i).optional(),
  search: z.string().trim().max(100).optional(),
  minPrice: z.coerce.number().min(0).max(1_000_000).optional(),
  maxPrice: z.coerce.number().min(0).max(1_000_000).optional(),
  available: z.enum(['true', 'false']).optional(),
}).strict().refine((query) => query.minPrice === undefined || query.maxPrice === undefined || query.minPrice <= query.maxPrice, {
  message: 'minPrice must be less than or equal to maxPrice',
  path: ['maxPrice'],
});
