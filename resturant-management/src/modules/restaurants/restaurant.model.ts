import { Schema, model, type InferSchemaType } from 'mongoose';

const openingHoursSchema = new Schema(
  {
    dayOfWeek: { type: Number, required: true, min: 0, max: 6 },
    opensAt: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
    closesAt: { type: String, required: true, match: /^([01]\d|2[0-3]):[0-5]\d$/ },
    isClosed: { type: Boolean, default: false },
  },
  { _id: false },
);

const restaurantSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 2000 },
    ownerUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    phone: { type: String, trim: true, maxlength: 32 },
    email: { type: String, trim: true, lowercase: true, maxlength: 254 },
    address: {
      line1: { type: String, required: true, trim: true, maxlength: 200 },
      line2: { type: String, trim: true, maxlength: 200 },
      city: { type: String, required: true, trim: true, maxlength: 100 },
      postalCode: { type: String, trim: true, maxlength: 24 },
      country: { type: String, required: true, default: 'Pakistan', trim: true, maxlength: 80 },
    },
    deliveryFeePaisa: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isSafeInteger,
    },
    image: {
      provider: { type: String, trim: true },
      assetId: { type: String, trim: true },
      url: { type: String, trim: true },
    },
    openingHours: { type: [openingHoursSchema], default: [] },
    timeZone: { type: String, required: true, default: 'Asia/Karachi' },
    isActive: { type: Boolean, default: true, required: true },
    deletedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);

restaurantSchema.index({ isActive: 1, 'address.city': 1, name: 1 }, { name: 'restaurants_public_city_name' });
restaurantSchema.index({ ownerUserId: 1, isActive: 1 }, { name: 'restaurants_owner_active' });

export type RestaurantDocument = InferSchemaType<typeof restaurantSchema>;
export const Restaurant = model('Restaurant', restaurantSchema);
