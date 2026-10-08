import type { Types } from 'mongoose';
import { User } from './user.model';

export const userRepository = {
  findByEmail(email: string, includePasswordHash = false) {
    const query = User.findOne({ email, deletedAt: null });
    if (includePasswordHash) query.select('+passwordHash');
    return query.exec();
  },

  findById(id: string | Types.ObjectId) {
    return User.findOne({ _id: id, deletedAt: null }).exec();
  },

  findByIdWithPasswordHash(id: string) {
    return User.findOne({ _id: id, deletedAt: null }).select('+passwordHash').exec();
  },

  updateProfile(id: string, fields: { name?: string; phone?: string }) {
    return User.findOneAndUpdate({ _id: id, deletedAt: null }, { $set: fields }, {
      new: true,
      runValidators: true,
    }).exec();
  },

  invalidateTokens(id: string) {
    return User.updateOne({ _id: id, deletedAt: null }, { $inc: { tokenVersion: 1 } }).exec();
  },
};
