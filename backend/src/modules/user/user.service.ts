import { Types } from 'mongoose';
import AppError from '../../utils/appError';
import User from './model/user.model';
import { UpdateUserDto } from './dto/user.dto';

export class UserService {
  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError('User id is invalid', 400);
    }
  }

  async getUser(userId: string) {
    this.validateId(userId);

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user;
  }

  async getUsers() {
    return await User.find();
  }

  async updateUser(userId: string, dto: UpdateUserDto) {
    this.validateId(userId);

    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return await User.findByIdAndUpdate(userId, dto, {
      runValidators: true,
      new: true,
    });
  }

  async deleteUser(userId: string) {
    this.validateId(userId);

    await User.findByIdAndDelete(userId);
  }
}
