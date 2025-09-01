import { NextFunction, Request, Response } from 'express';

type AsyncFunction<T, R extends Request> = (
  req: R,
  res: Response,
  next: NextFunction
) => Promise<T>;

export const catchAsync =
  <T, R extends Request>(fn: AsyncFunction<T, R>) =>
  (req: R, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };
