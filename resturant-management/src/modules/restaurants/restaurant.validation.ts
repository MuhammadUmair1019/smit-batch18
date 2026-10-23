import { z } from 'zod';

const imageSchema = z.object({
  provider: z.string().trim().max(40).optional(),
  assetId: z.string().trim().max(200).optional(),
  url: z.string().url().max(2048).optional(),
}).strict();

const addressSchema = z.object({
  line1: z.string().trim().min(1).max(200),
  line2: z.string().trim().max(200).optional(),
  city: z.string().trim().min(1).max(100),
  postalCode: z.string().trim().max(24).optional(),
  country: z.string().trim().min(1).max(80).default('Pakistan'),
}).strict();

const timeZoneSchema = z.string().trim().min(1).max(100).refine((value) => {
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value });
    return true;
  } catch {
    return false;
  }
}, 'Must be a valid IANA timezone');

const openingDaySchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  opensAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  closesAt: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/),
  isClosed: z.boolean().default(false),
}).strict().refine((day) => day.opensAt !== day.closesAt, {
  message: 'Opening and closing time must differ',
  path: ['closesAt'],
});

const restaurantFields = {
  name: z.string().trim().min(2).max(160),
  description: z.string().trim().max(2000).optional(),
  phone: z.string().trim().min(7).max(32).optional(),
  email: z.string().trim().email().max(254).toLowerCase().optional(),
  address: addressSchema,
  deliveryFee: z.number().min(0).max(1_000_000),
  image: imageSchema.optional(),
  openingHours: z.array(openingDaySchema).length(7).refine((hours) => new Set(hours.map((entry) => entry.dayOfWeek)).size === 7, {
    message: 'Opening hours must contain each weekday exactly once',
  }),
  timeZone: timeZoneSchema,
};

export const createRestaurantSchema = z.object({
  ...restaurantFields,
  ownerUserId: z.string().regex(/^[a-f\d]{24}$/i).optional(),
}).strict();

export const updateRestaurantSchema = z.object({
  name: restaurantFields.name.optional(),
  description: restaurantFields.description,
  phone: restaurantFields.phone,
  email: restaurantFields.email,
  address: restaurantFields.address.optional(),
  deliveryFee: restaurantFields.deliveryFee.optional(),
  image: restaurantFields.image,
  openingHours: restaurantFields.openingHours.optional(),
  timeZone: restaurantFields.timeZone.optional(),
  isActive: z.boolean().optional(),
}).strict().refine((value) => Object.keys(value).length > 0, 'Provide at least one field to update');

export const restaurantListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().max(100).optional(),
  city: z.string().trim().max(100).optional(),
  open: z.enum(['true', 'false']).optional(),
}).strict();
