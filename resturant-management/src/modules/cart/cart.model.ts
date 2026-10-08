import { Schema, model, type InferSchemaType } from 'mongoose';

const cartItemSchema = new Schema(
  {
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', required: true },
    quantity: { type: Number, required: true, min: 1, max: 99, validate: Number.isSafeInteger },
  },
  { _id: false },
);

const cartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', default: null },
    items: { type: [cartItemSchema], default: [], validate: (items: unknown[]) => items.length <= 100 },
  },
  { timestamps: true, versionKey: false },
);

cartSchema.index({ userId: 1 }, { unique: true, name: 'carts_user_unique' });

export type CartDocument = InferSchemaType<typeof cartSchema>;
export const Cart = model('Cart', cartSchema);
