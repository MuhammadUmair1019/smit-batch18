import jwt, { type JwtPayload } from 'jsonwebtoken';
import { Types } from 'mongoose';
import type { RequestHandler } from 'express';
import { env } from '../../config/env';
import { AppError } from '../../shared/errors/app-error';
import { User, USER_ROLES } from '../users/user.model';

type AccessTokenPayload = JwtPayload & {
  role: (typeof USER_ROLES)[number];
  tokenVersion: number;
};

export const authenticate: RequestHandler = async (request, _response, next) => {
  const authorization = request.header('authorization');
  const match = authorization?.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    next(new AppError('Authentication is required', 401, 'AUTHENTICATION_REQUIRED'));
    return;
  }

  try {
    const verified = jwt.verify(match[1], env.JWT_SECRET, {
      algorithms: ['HS256'],
      issuer: env.JWT_ISSUER,
      audience: env.JWT_AUDIENCE,
    });
    if (typeof verified === 'string' || !verified.sub || !Types.ObjectId.isValid(verified.sub)) {
      throw new AppError('Invalid access token', 401, 'INVALID_TOKEN');
    }

    const payload = verified as AccessTokenPayload;
    if (!USER_ROLES.includes(payload.role) || !Number.isSafeInteger(payload.tokenVersion)) {
      throw new AppError('Invalid access token', 401, 'INVALID_TOKEN');
    }

    const user = await User.findOne({ _id: payload.sub, deletedAt: null })
      .select('_id role status tokenVersion')
      .exec();
    if (!user || user.status !== 'active' || user.role !== payload.role || user.tokenVersion !== payload.tokenVersion) {
      throw new AppError('Access token is no longer valid', 401, 'TOKEN_REVOKED');
    }

    request.authUser = { id: user._id.toString(), role: user.role as (typeof USER_ROLES)[number] };
    next();
  } catch (error) {
    if (error instanceof AppError) {
      next(error);
      return;
    }
    if (error instanceof jwt.JsonWebTokenError || error instanceof jwt.TokenExpiredError) {
      next(new AppError('Invalid or expired access token', 401, 'INVALID_TOKEN'));
      return;
    }
    next(error);
  }
};

export function authorize(...roles: (typeof USER_ROLES)[number][]): RequestHandler {
  return (request, _response, next) => {
    if (!request.authUser) {
      next(new AppError('Authentication is required', 401, 'AUTHENTICATION_REQUIRED'));
      return;
    }
    if (!roles.includes(request.authUser.role)) {
      next(new AppError('You do not have permission to perform this action', 403, 'FORBIDDEN'));
      return;
    }
    next();
  };
}
