import { Request, Response, NextFunction } from 'express';
import Order from '../models/orderModel';
import AppError from '../utils/appError';
import { catchAsync } from '../utils/catchAsync';

export const getMonthlyRevenue = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Order.aggregate([
      {
        $match: { status: { $in: ['In progress', 'Completed'] } },
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' },
          },
          totalRevenue: { $sum: '$total' },
        },
      },
      {
        $sort: {
          '_id.year': 1,
          '_id.month': 1,
        },
      },
    ]);

    if (!stats) {
      return next(new AppError('Failed to generate analytics data!', 500));
    }

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  }
);

export const getOrdersByCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const stats = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.type',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: '$items.total' },
        },
      },
      { $sort: { totalQuantity: -1 } },
    ]);

    if (!stats) {
      return next(new AppError('Failed to generate analytics data!', 500));
    }

    res.status(200).json({
      status: 'success',
      data: stats,
    });
  }
);
