import express from 'express';
import { protect, restrictTo } from '../../controllers/authController';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';

const analyticsService = new AnalyticsService();
const analyticsController = new AnalyticsController(analyticsService);

const analyticsRouter = express.Router();

analyticsRouter.use(protect);
analyticsRouter.use(restrictTo('admin'));

analyticsRouter.get('/monthly-revenue', analyticsController.getMonthlyRevenue);

analyticsRouter.get(
  '/orders-by-category',
  analyticsController.getOrdersByCategory
);

export { analyticsRouter };
