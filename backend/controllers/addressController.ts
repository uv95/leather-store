import { NextFunction, Response } from 'express';
import Address from '../models/addressModel';
import { catchAsync } from '../utils/catchAsync';
import {
  createOne,
  deleteOne,
  getOne,
  updateOne,
} from '../utils/handlerFactory';
import { RequestWithUser } from '../utils/types';

export const setUserId = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.user) {
    req.body.user = req.user.id;
  }

  next();
};

export const getMyAddresses = catchAsync(
  async (req: RequestWithUser, res: Response, next: NextFunction) => {
    const addresses = await Address.find({ user: req.user.id });

    res.status(200).json({
      status: 'success',
      data: addresses,
    });
  }
);

export const getOneAddress = getOne(Address);
export const createAddress = createOne(Address);
export const updateAddress = updateOne(Address);
export const deleteAddress = deleteOne(Address);
