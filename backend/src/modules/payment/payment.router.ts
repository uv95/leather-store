import express from 'express';
import { protect, restrictTo } from '../auth/auth.middleware';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';

const paymentService = new PaymentService();
const paymentController = new PaymentController(paymentService);

const paymentRouter = express.Router();

paymentRouter.use(protect);
paymentRouter.use(restrictTo('user'));

paymentRouter
  .route('/create')
  .post(restrictTo('user'), paymentController.createPayment);

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
