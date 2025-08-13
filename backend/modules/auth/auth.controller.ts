import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { UserDocument } from 'modules/user/model/user.model';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { AuthService } from './auth.service';
import {
  LoginDto,
  ResetPasswordDto,
  SignupDto,
  UpdatePasswordDto,
} from './dto/auth.dto';

const MILLISECONDS_IN_SECOND = 1000;
const SECONDS_IN_MINUTE = 60;
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  signup = catchAsync(
    async (
      req: Request<{}, {}, SignupDto>,
      res: Response,
      next: NextFunction
    ) => {
      const user = await this.authService.signup(req.body);

      this.createSendToken(user, 201, res);
    }
  );

  login = catchAsync(
    async (
      req: Request<{}, {}, LoginDto>,
      res: Response,
      next: NextFunction
    ) => {
      const user = await this.authService.login(req.body);

      this.createSendToken(user, 200, res);
    }
  );

  resetPassword = catchAsync(
    async (
      req: RequestWithUser<{ token: string }, {}, ResetPasswordDto>,
      res: Response,
      next: NextFunction
    ) => {
      const user = await this.authService.resetPassword(
        req.params.token,
        req.body
      );

      this.createSendToken(user, 200, res);
    }
  );

  updatePassword = catchAsync(
    async (
      req: RequestWithUser<{}, {}, UpdatePasswordDto>,
      res: Response,
      next: NextFunction
    ) => {
      const user = await this.authService.updatePassword(
        req.user?.id,
        req.body
      );

      this.createSendToken(user, 200, res);
    }
  );

  signToken = (id: string) => {
    if (!process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
      throw new Error('JWT_SECRET or/and JWT_EXPIRES_IN not defined!');
    }

    jwt.sign({ id }, process.env.JWT_SECRET as string, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });
  };

  createSendToken = (user: UserDocument, statusCode: number, res: Response) => {
    const token = this.signToken(String(user._id));

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
      data: user,
    });
  };
}
