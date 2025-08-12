import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { OrderService } from './order.service';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  getUserOrders = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const orders = await this.orderService.getUserOrders(req.user?.id);

      res.status(200).json({
        status: 'success',
        data: orders,
      });
    }
  );

  getAllOrders = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const orders = await this.orderService.getAllOrders();

      res.status(200).json({
        status: 'success',
        data: orders,
      });
    }
  );

  createOrder = catchAsync(
    async (
      req: RequestWithUser<{}, {}, CreateOrderDto>,
      res: Response,
      next: NextFunction
    ) => {
      const order = await this.orderService.createOrder(req.user?.id, req.body);

      res.status(201).json({
        status: 'success',
        data: order,
      });
    }
  );

  deleteOrder = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await this.orderService.deleteOrder(req.params.orderId);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );

  updateOrder = catchAsync(
    async (
      req: Request<{ orderId: string }, {}, UpdateOrderDto>,
      res: Response,
      next: NextFunction
    ) => {
      const updatedOrder = await this.orderService.updateOrder(
        req.params.orderId,
        req.body
      );

      res.status(200).json({
        status: 'success',
        data: updatedOrder,
      });
    }
  );

  getUserActiveOrderCount = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const count = await this.orderService.getUserActiveOrderCount(
        req.user?.id
      );

      res.status(200).json({
        status: 'success',
        data: count,
      });
    }
  );
}
