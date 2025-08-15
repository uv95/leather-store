import express from 'express';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { protect } from './auth.middleware';

const authService = new AuthService();
const authController = new AuthController(authService);

const authRouter = express.Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.patch('/resetPassword/:token', authController.resetPassword);
authRouter.patch('/updatePassword', protect, authController.updatePassword);

export { authRouter };
