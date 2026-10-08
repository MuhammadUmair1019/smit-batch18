import { Schema, model, type InferSchemaType } from 'mongoose';

export const USER_ROLES = ['customer', 'restaurant_admin', 'super_admin'] as const;
export const USER_STATUSES = ['active', 'blocked'] as const;

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 254,
    },
    passwordHash: { type: String, required: true, select: false },
    phone: { type: String, trim: true, maxlength: 32 },
    role: { type: String, enum: USER_ROLES, required: true, default: 'customer' },
    status: { type: String, enum: USER_STATUSES, required: true, default: 'active' },
    tokenVersion: { type: Number, required: true, default: 0, min: 0 },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, versionKey: false },
);

userSchema.index({ email: 1 }, { unique: true, name: 'users_email_unique' });
userSchema.index({ role: 1, status: 1 }, { name: 'users_role_status' });

export type UserDocument = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
