import { promisify } from 'util';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User, { UserDocument } from '../models/userModel';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';
import { sendEmail } from '../utils/email';
import { Request, Response, NextFunction } from 'express';
import { RequestWithUser } from '../utils/types';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

const signToken = (id: string) => {
  if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
    throw new Error('JWT_SECRET or/and JWT_EXPIRES_IN not defined!');
  }

  jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: +process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: UserDocument,
  statusCode: number,
  res: Response
) => {
  const token = signToken(String(user._id));

  if (!process.env.JWT_COOKIE_EXPIRES_IN) {
    throw new Error('JWT_COOKIE_EXPIRES_IN not defined!');
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        +process.env.JWT_COOKIE_EXPIRES_IN *
          HOURS_IN_DAY *
          MINUTES_IN_HOUR *
          SECONDS_IN_MINUTE *
          MILLISECONDS_IN_SECOND
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  res.cookie('jwt', token, cookieOptions);
  user.password = '';

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: UserDocument = await User.create({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      role: req.body.role,
    });

    createSendToken(newUser, 201, res);
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError('Please enter password and email', 400));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError('Email or password is incorrect', 401));
    }

    createSendToken(user, 200, res);
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    )
      token = req.headers.authorization.split(' ')[1];

    if (!token) return next(new AppError('You are not authorized', 401));

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
      return next(new AppError('User does not exist', 401));
    }

    if (decoded.iat && currentUser.changedPasswordAfter(decoded.iat)) {
      return next(
        new AppError('Password was changed. Please log in again', 401)
      );
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

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new AppError('No user with this email exists', 404));
    }

    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/users/resetPassword/${resetToken}`;

    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, ignore this email.`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10min)',
        message,
      });

      res.status(200).json({
        status: 'success',
        message: 'Token sent',
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });

      return next(new AppError('Error sending email. Please try again', 500));
    }
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashedToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Token is invalid', 400));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    createSendToken(user, 200, res);
  }
);

export const updatePassword = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    if (!req.user) {
      return;
    }

    const user = await User.findById(req.user.id).select('+password');

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (
      !(await user.correctPassword(req.body.passwordCurrent, user.password))
    ) {
      return next(new AppError('Incorrect password', 401));
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();

    createSendToken(user, 200, res);
  }
);
