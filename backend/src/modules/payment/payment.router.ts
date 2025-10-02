import express from 'express';
import { protect, restrictTo } from '../auth/auth.middleware';
import { paymentController } from './payment.module';

const paymentRouter = express.Router({ mergeParams: true });

paymentRouter.use(protect);

paymentRouter
  .route('/')
  .post(restrictTo('user'), paymentController.createPayment)
  .get(restrictTo('user'), paymentController.getPayment);

paymentRouter
  .route('/')
  .get(restrictTo('admin'), paymentController.getAllPayments);

paymentRouter.use(restrictTo('user'));

paymentRouter
  .route('/:paymentIntentId/confirm')
  .post(paymentController.confirmPayment);

paymentRouter
  .route('/:paymentIntentId/cancel')
  .post(paymentController.cancelPayment);

paymentRouter.route('/:paymentIntentId').get(paymentController.retrievePayment);

export { paymentRouter };
