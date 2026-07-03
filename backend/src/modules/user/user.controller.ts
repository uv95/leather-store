import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';

export class UserController {
  constructor(private readonly userService: UserService) {}

  getUser = catchAsync(
    async (req: RequestWithUser, res: Response) => {
      const data = await this.userService.getUser(req.user?.id);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  getUsers = catchAsync(
    async (req: Request, res: Response) => {
      const data = await this.userService.getUsers();

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  updateUser = catchAsync(
    async (
      req: RequestWithUser<{}, {}, UpdateUserDto>,
      res: Response) => {
      const data = await this.userService.updateUser(req.user?.id, req.body);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  deleteUser = catchAsync(
    async (req: RequestWithUser, res: Response) => {
      await this.userService.deleteUser(req.user?.id);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
}
