import { Types } from 'mongoose';
import AppError from '../../utils/appError';
import Address from './model/address.model';
import { CreateAddressDto, UpdateAddressDto } from './dto/address.dto';

export class AddressService {
  private validateId(id: string, entity: 'Address' | 'User') {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(`${entity} id is invalid`, 400);
    }
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    this.validateId(userId, 'User');

    return await Address.create({ user: userId, ...dto });
  }

  async updateAddress(addressId: string, dto: UpdateAddressDto) {
    this.validateId(addressId, 'Address');

    const address = await Address.findById(addressId);

    if (!address) {
      throw new AppError('Address not found', 404);
    }

    return await Address.findByIdAndUpdate(addressId, dto, {
      runValidators: true,
      new: true,
    });
  }

  async deleteAddress(addressId: string) {
    this.validateId(addressId, 'Address');

    await Address.findByIdAndDelete(addressId);
  }

  async getUserAddresses(userId: string) {
    this.validateId(userId, 'User');

    return await Address.find({ user: userId });
  }
}
