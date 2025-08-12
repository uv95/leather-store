import express from 'express';
import { protect, restrictTo } from '../../controllers/authController';
import { AddressService } from './address.service';
import { Addressontroller } from './address.controller';

const addressService = new AddressService();
const addressController = new Addressontroller(addressService);

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
