const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.getMonthlyRevenue = catchAsync(async (req, res, next) => {
  const stats = await Order.aggregate([
    {
      $match: { status: { $in: ['In progress', 'Completed'] } },
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
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
});
