import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { AnalyticsService } from './analytics.service';

export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  getMonthlyRevenue = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const stats = await this.analyticsService.getMonthlyRevenue();

      res.status(200).json({
        status: 'success',
        data: stats,
      });
    }
  );

  getOrdersByCategory = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const stats = await this.analyticsService.getOrdersByCategory();

      res.status(200).json({
        status: 'success',
        data: stats,
      });
    }
  );
}
