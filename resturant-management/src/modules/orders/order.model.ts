import { Schema, model, type InferSchemaType } from 'mongoose';

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'out_for_delivery',
  'delivered',
  'cancelled',
  'rejected',
] as const;

export const PAYMENT_STATUSES = ['pending', 'paid', 'failed', 'refunded'] as const;

const orderItemSchema = new Schema(
  {
    menuItemId: { type: Schema.Types.ObjectId, ref: 'MenuItem', default: null },
    name: { type: String, required: true, trim: true, maxlength: 160 },
    unitPricePaisa: { type: Number, required: true, min: 0, validate: Number.isSafeInteger },
    quantity: { type: Number, required: true, min: 1, max: 99, validate: Number.isSafeInteger },
    lineSubtotalPaisa: { type: Number, required: true, min: 0, validate: Number.isSafeInteger },
  },
  { _id: false },
);

const addressSchema = new Schema(
  {
    line1: { type: String, required: true, trim: true, maxlength: 200 },
    line2: { type: String, trim: true, maxlength: 200 },
    city: { type: String, required: true, trim: true, maxlength: 100 },
    postalCode: { type: String, trim: true, maxlength: 24 },
    country: { type: String, required: true, trim: true, maxlength: 80 },
  },
  { _id: false },
);

const statusHistorySchema = new Schema(
  {
    from: { type: String, enum: ORDER_STATUSES },
    to: { type: String, enum: ORDER_STATUSES, required: true },
    actorUserId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    at: { type: Date, required: true, default: Date.now },
    reason: { type: String, trim: true, maxlength: 500 },
  },
  { _id: false },
);

const orderSchema = new Schema(
  {
    orderNumber: { type: String, required: true, trim: true, maxlength: 40 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    restaurantId: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    items: { type: [orderItemSchema], required: true, validate: (items: unknown[]) => items.length > 0 && items.length <= 100 },
    deliveryAddress: { type: addressSchema, required: true },
    phone: { type: String, required: true, trim: true, maxlength: 32 },
    subtotalPaisa: { type: Number, required: true, min: 0, validate: Number.isSafeInteger },
    deliveryFeePaisa: { type: Number, required: true, min: 0, validate: Number.isSafeInteger },
    discountPaisa: { type: Number, required: true, min: 0, default: 0, validate: Number.isSafeInteger },
    totalPaisa: { type: Number, required: true, min: 0, validate: Number.isSafeInteger },
    currency: { type: String, enum: ['PKR'], required: true, default: 'PKR' },
    paymentMethod: { type: String, enum: ['cash'], required: true, default: 'cash' },
    paymentStatus: { type: String, enum: PAYMENT_STATUSES, required: true, default: 'pending' },
    orderStatus: { type: String, enum: ORDER_STATUSES, required: true, default: 'pending' },
    notes: { type: String, trim: true, maxlength: 1000 },
    cancelledAt: { type: Date },
    statusHistory: { type: [statusHistorySchema], default: [], validate: (items: unknown[]) => items.length <= 100 },
  },
  { timestamps: true, versionKey: false },
);

orderSchema.index({ orderNumber: 1 }, { unique: true, name: 'orders_number_unique' });
orderSchema.index({ userId: 1, createdAt: -1 }, { name: 'orders_user_created' });
orderSchema.index({ restaurantId: 1, orderStatus: 1, createdAt: -1 }, { name: 'orders_restaurant_status_created' });

export type OrderDocument = InferSchemaType<typeof orderSchema>;
export const Order = model('Order', orderSchema);
