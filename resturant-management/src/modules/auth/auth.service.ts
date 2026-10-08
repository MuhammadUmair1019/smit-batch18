import bcrypt from 'bcryptjs';
import jwt, { type SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env';
import { AppError } from '../../shared/errors/app-error';
import { userRepository } from '../users/user.repository';
import { User } from '../users/user.model';

const BCRYPT_ROUNDS = 12;

type UserForResponse = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: string;
};

function serializeUser(user: {
  _id: { toString(): string };
  name: string;
  email: string;
  phone?: string | null;
  role: string;
}): UserForResponse {
  return {
    id: user._id.toString(),
    name: user.name,
    email: user.email,
    ...(user.phone ? { phone: user.phone } : {}),
    role: user.role,
  };
}

function createAccessToken(user: { _id: { toString(): string }; role: string; tokenVersion: number }): string {
  const options: SignOptions = {
    algorithm: 'HS256',
    subject: user._id.toString(),
    issuer: env.JWT_ISSUER,
    audience: env.JWT_AUDIENCE,
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
  };
  return jwt.sign({ role: user.role, tokenVersion: user.tokenVersion }, env.JWT_SECRET, options);
}

export const authService = {
  async register(input: { name: string; email: string; password: string; phone: string }) {
    const existing = await userRepository.findByEmail(input.email);
    if (existing) throw new AppError('Email is already registered', 409, 'EMAIL_ALREADY_EXISTS');

    const passwordHash = await bcrypt.hash(input.password, BCRYPT_ROUNDS);
    const user = new User({
      name: input.name,
      email: input.email,
      passwordHash,
      phone: input.phone,
      role: 'customer',
    });

    try {
      await user.save();
    } catch (error) {
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 11000) {
        throw new AppError('Email is already registered', 409, 'EMAIL_ALREADY_EXISTS');
      }
      throw error;
    }

    return { user: serializeUser(user), accessToken: createAccessToken(user) };
  },

  async login(input: { email: string; password: string }) {
    const user = await userRepository.findByEmail(input.email, true);
    if (!user || user.status !== 'active' || !(await bcrypt.compare(input.password, user.passwordHash))) {
      throw new AppError('Invalid email or password', 401, 'INVALID_CREDENTIALS');
    }
    return { user: serializeUser(user), accessToken: createAccessToken(user) };
  },

  async logout(userId: string): Promise<void> {
    await userRepository.invalidateTokens(userId);
  },

  async getCurrentUser(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user || user.status !== 'active') throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    return serializeUser(user);
  },

  async updateProfile(userId: string, fields: { name?: string; phone?: string }) {
    const user = await userRepository.updateProfile(userId, fields);
    if (!user || user.status !== 'active') throw new AppError('User not found', 404, 'USER_NOT_FOUND');
    return serializeUser(user);
  },

  async changePassword(userId: string, input: { currentPassword: string; newPassword: string }): Promise<void> {
    const user = await userRepository.findByIdWithPasswordHash(userId);
    if (!user || !(await bcrypt.compare(input.currentPassword, user.passwordHash))) {
      throw new AppError('Current password is incorrect', 400, 'CURRENT_PASSWORD_INCORRECT');
    }
    user.passwordHash = await bcrypt.hash(input.newPassword, BCRYPT_ROUNDS);
    user.tokenVersion += 1;
    await user.save();
  },
};
