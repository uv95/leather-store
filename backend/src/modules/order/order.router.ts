import { CartService } from '../../modules/cart/cart.service';
import { protect, restrictTo } from '../../modules/auth/auth.middleware';
import express from 'express';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { paymentRouter } from '../payment/payment.router';

const cartService = new CartService();
const orderService = new OrderService(cartService);
const orderController = new OrderController(orderService);

const orderRouter = express.Router();

orderRouter.use(protect);

orderRouter.use('/:orderId/payment', paymentRouter);

orderRouter
  .route('/')
  .get(restrictTo('admin'), orderController.getAllOrders)
  .post(restrictTo('user'), orderController.createOrder);

orderRouter
  .route('/:orderId')
  .delete(orderController.deleteOrder)
  .patch(orderController.updateOrder);

orderRouter
  .route('/userOrders')
  .get(restrictTo('user'), orderController.getUserOrders);

orderRouter
  .route('/userOrders/count')
  .get(restrictTo('user'), orderController.getUserActiveOrderCount);

export { orderRouter };
