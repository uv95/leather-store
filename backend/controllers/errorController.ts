import { CastError, Error as MongooseError } from 'mongoose';
import AppError, { AppErrorType } from '../utils/appError';
import { Request, Response, NextFunction } from 'express';
import type { MongoServerError } from 'mongodb';

type KnownErrors =
  | AppErrorType
  | CastError
  | MongooseError.ValidationError
  | MongoServerError
  | Error;

const handleCastErrorDB = (err: CastError) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoServerError) => {
  const value = err.keyValue.name;
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err: MongooseError.ValidationError) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Log in again', 401);

const handleJWTExpiredError = () =>
  new AppError('Token expired. Log in again', 401);

const sendErrorDev = (err: AppErrorType, res: Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};
const sendErrorProd = (err: AppErrorType, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export const errorController = (
  err: KnownErrors,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let error = err;

  if (!('statusCode' in err)) {
    (error as AppErrorType).statusCode = 500;
  }
  if (!('status' in err)) {
    (error as AppErrorType).status = 'error';
  }

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(error as AppErrorType, res);
  } else if (process.env.NODE_ENV === 'production') {
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error as CastError);
    } else if ('code' in error && error.code === 11000) {
      error = handleDuplicateFieldsDB(error as MongoServerError);
    } else if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error as MongooseError.ValidationError);
    } else if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    } else if (error.name === 'TokenExpiredError') {
      error = handleJWTExpiredError();
    }

    sendErrorProd(error as AppErrorType, res);
  }
};
