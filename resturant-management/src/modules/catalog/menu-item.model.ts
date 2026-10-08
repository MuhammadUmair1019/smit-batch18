import { Schema, model, type InferSchemaType } from 'mongoose';

const menuItemSchema = new Schema(
  {
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    name: { type: String, required: true, trim: true, minlength: 1, maxlength: 160 },
    description: { type: String, trim: true, maxlength: 2000 },
    pricePaisa: { type: Number, required: true, min: 1, validate: Number.isSafeInteger },
    discountPricePaisa: { type: Number, min: 1, validate: Number.isSafeInteger },
    image: {
      provider: { type: String, trim: true },
      assetId: { type: String, trim: true },
      url: { type: String, trim: true },
    },
    ingredients: { type: [String], default: [], validate: (values: string[]) => values.length <= 50 },
    isAvailable: { type: Boolean, default: true, required: true },
    preparationTimeMinutes: { type: Number, min: 1, max: 1440, validate: Number.isSafeInteger },
    deletedAt: { type: Date, default: null },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true, versionKey: false },
);

menuItemSchema.index({ restaurantId: 1, categoryId: 1, isAvailable: 1 }, { name: 'menu_restaurant_category_availability' });
menuItemSchema.index({ restaurantId: 1, pricePaisa: 1 }, { name: 'menu_restaurant_price' });
menuItemSchema.index({ restaurantId: 1, name: 1 }, { name: 'menu_restaurant_name' });
menuItemSchema.pre('validate', function validateDiscount() {
  if (
    typeof this.discountPricePaisa === 'number' &&
    typeof this.pricePaisa === 'number' &&
    this.discountPricePaisa >= this.pricePaisa
  ) {
    this.invalidate('discountPricePaisa', 'Discount price must be lower than regular price');
  }
});

export type MenuItemDocument = InferSchemaType<typeof menuItemSchema>;
export const MenuItem = model('MenuItem', menuItemSchema);
