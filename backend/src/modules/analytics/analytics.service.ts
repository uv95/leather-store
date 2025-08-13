import Order, { OrderStatus } from '../../modules/order/model/order.model';
import AppError from '../../utils/appError';
import OrderItem from '../../modules/order/model/orderItem.model';

export class AnalyticsService {
  async getMonthlyRevenue() {
    const stats = await Order.aggregate([
      {
        $match: {
          status: { $in: [OrderStatus.IN_PROGRESS, OrderStatus.COMPLETED] },
        },
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
      throw new AppError('Failed to generate analytics data!', 500);
    }

    return stats;
  }

  async getOrdersByCategory() {
    const stats = await OrderItem.aggregate([
      {
        $lookup: {
          from: 'items',
          localField: 'item',
          foreignField: '_id',
          as: 'itemData',
        },
      },
      { $unwind: '$itemData' },
      {
        $group: {
          _id: '$itemData.type',
          totalQuantity: { $sum: '$quantity' },
          totalRevenue: { $sum: { $multiply: ['$price', '$quantity'] } },
        },
      },
      { $sort: { totalQuantity: -1 } },
    ]);

    if (!stats) {
      throw new AppError('Failed to generate analytics data!', 500);
    }

    return stats;
  }
}
