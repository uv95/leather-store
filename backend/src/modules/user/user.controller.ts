import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/user.dto';

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const user = await this.userService.getUser(req.user?.id);

      res.status(200).json({
        status: 'success',
        data: user,
      });
    }
  );

  getUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const users = await this.userService.getUsers();

      res.status(200).json({
        status: 'success',
        data: users,
      });
    }
  );

  updateUser = catchAsync(
    async (
      req: RequestWithUser<{}, {}, UpdateUserDto>,
      res: Response,
      next: NextFunction
    ) => {
      const updatedUser = await this.userService.updateUser(
        req.user?.id,
        req.body
      );

      res.status(200).json({
        status: 'success',
        data: updatedUser,
      });
    }
  );

  deleteUser = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      await this.userService.deleteUser(req.user?.id);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
}
