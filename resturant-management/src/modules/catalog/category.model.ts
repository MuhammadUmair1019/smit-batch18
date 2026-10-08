import { Schema, model, type InferSchemaType } from 'mongoose';

const categorySchema = new Schema(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    name: { type: String, required: true, trim: true, minlength: 1, maxlength: 100 },
    normalizedName: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      set: (value: string) => value.trim().toLocaleLowerCase('en'),
    },
    description: { type: String, trim: true, maxlength: 1000 },
    image: {
      provider: { type: String, trim: true },
      assetId: { type: String, trim: true },
      url: { type: String, trim: true },
    },
    sortOrder: { type: Number, default: 0, min: 0 },
    isActive: { type: Boolean, default: true, required: true },
    deletedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);

categorySchema.index(
  { restaurantId: 1, normalizedName: 1 },
  { unique: true, partialFilterExpression: { deletedAt: null }, name: 'categories_restaurant_name_active_unique' },
);
categorySchema.index({ restaurantId: 1, isActive: 1, sortOrder: 1 }, { name: 'categories_restaurant_order' });

export type CategoryDocument = InferSchemaType<typeof categorySchema>;
export const Category = model('Category', categorySchema);
