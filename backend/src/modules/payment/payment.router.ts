import express from 'express';
import { protect, restrictTo } from '../auth/auth.middleware';
import { paymentController } from './payment.module';

const paymentRouter = express.Router({ mergeParams: true });

paymentRouter.use(protect);

paymentRouter
  .route('/')
  .get(restrictTo('admin'), paymentController.getAllPayments);

paymentRouter.use(restrictTo('user'));

paymentRouter
  .route('/')
  .post(paymentController.createPayment)
  .get(paymentController.getPayment);

paymentRouter
  .route('/:paymentIntentId/confirm')
  .post(paymentController.confirmPayment);

paymentRouter
  .route('/:paymentIntentId/cancel')
  .post(paymentController.cancelPayment);

paymentRouter.route('/:paymentIntentId').get(paymentController.retrievePayment);

paymentRouter.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  paymentController.handleWebhook
);

export { paymentRouter };
