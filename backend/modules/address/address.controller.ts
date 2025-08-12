import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { AddressService } from './address.service';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

export class Addressontroller {
  constructor(private readonly addressService: AddressService) {}

  createAddress = catchAsync(
    async (
      req: RequestWithUser<{}, {}, CreateAddressDto>,
      res: Response,
      next: NextFunction
    ) => {
      const address = await this.addressService.createAddress(
        req.user?.id,
        req.body
      );

      res.status(201).json({
        status: 'success',
        data: address,
      });
    }
  );

  updateAddress = catchAsync(
    async (
      req: Request<{ addressId: string }, {}, UpdateAddressDto>,
      res: Response,
      next: NextFunction
    ) => {
      const updatedItem = await this.addressService.updateAddress(
        req.params.addressId,
        req.body
      );

      res.status(200).json({
        status: 'success',
        data: updatedItem,
      });
    }
  );

  deleteAddress = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await this.addressService.deleteAddress(req.params.addressId);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );

  getUserAddresses = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const addresses = await this.addressService.getUserAddresses(
        req.user?.id
      );

      res.status(200).json({
        status: 'success',
        data: addresses,
      });
    }
  );
}
