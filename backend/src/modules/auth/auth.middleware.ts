import { catchAsync } from '../../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import { RequestWithUser } from '../../utils/types';
import AppError from '../../utils/appError';
import User from '../../modules/user/model/user.model';
import { promisify } from 'node:util';
import jwt from 'jsonwebtoken';

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('You are not authorized', 401));
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not defined!');
    }

    const jwtVerify: (
      token: string,
      secret: string
    ) => Promise<jwt.JwtPayload> = promisify(jwt.verify);

    const decoded = await jwtVerify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      throw new AppError('User does not exist', 401);
    }

    if (decoded.iat && currentUser.changedPasswordAfter(decoded.iat)) {
      throw new AppError('Password was changed. Please log in again', 401);
    }

    (req as RequestWithUser).user = currentUser;

    next();
  }
);

export const restrictTo =
  (role: 'admin' | 'user') =>
  (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (req.user && role !== req.user.role)
      return next(
        new AppError('You are not allowed to perform this action', 403)
      );

    next();
  };
