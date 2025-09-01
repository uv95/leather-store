import express from 'express';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { protect, restrictTo } from '../../modules/auth/auth.middleware';

const userService = new UserService();
const userController = new UserController(userService);

const userRouter = express.Router();

userRouter.use(protect);

userRouter
  .route('/currentUser')
  .get(userController.getUser)
  .patch(restrictTo('user'), userController.updateUser)
  .delete(restrictTo('user'), userController.deleteUser);

userRouter.route('/').get(restrictTo('admin'), userController.getUsers);

export { userRouter };
