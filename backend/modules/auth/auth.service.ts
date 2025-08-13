import crypto from 'crypto';
import User from '../../modules/user/model/user.model';
import { Types } from 'mongoose';
import AppError from '../../utils/appError';
import {
  LoginDto,
  ResetPasswordDto,
  SignupDto,
  UpdatePasswordDto,
} from './dto/auth.dto';

export class AuthService {
  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError('User id is invalid', 400);
    }
  }

  async signup(dto: SignupDto) {
    return await User.create(dto);
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    if (!email || !password) {
      throw new AppError('Please enter password and email', 400);
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new AppError('Email or password is incorrect', 401);
    }

    return user;
  }

  async resetPassword(token: string, dto: ResetPasswordDto) {
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      throw new AppError('Token is invalid', 400);
    }

    user.password = dto.password;
    user.passwordConfirm = dto.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    return user;
  }

  async updatePassword(userId: string, dto: UpdatePasswordDto) {
    this.validateId(userId);

    const user = await User.findById(userId).select('+password');

    if (!user) {
      throw new AppError('User not found', 404);
    }

    if (!(await user.correctPassword(dto.passwordCurrent, user.password))) {
      throw new AppError('Incorrect password', 401);
    }

    user.password = dto.password;
    user.passwordConfirm = dto.passwordConfirm;

    await user.save();

    return user;
  }
}
