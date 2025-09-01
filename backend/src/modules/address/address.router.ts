import express from 'express';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { protect, restrictTo } from '../../modules/auth/auth.middleware';

const addressService = new AddressService();
const addressController = new AddressController(addressService);

const addressRouter = express.Router();

addressRouter.use(protect);
addressRouter.use(restrictTo('user'));

addressRouter
  .route('/')
  .get(addressController.getUserAddresses)
  .post(addressController.createAddress);

addressRouter
  .route('/:addressId')
  .patch(addressController.updateAddress)
  .delete(addressController.deleteAddress);

export { addressRouter };
