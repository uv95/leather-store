import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { CreatePaymentIntentDto } from './dto/payment.dto';
import { PaymentService } from './payment.service';

export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  createPayment = catchAsync(
    async (
      req: Request<{}, {}, CreatePaymentIntentDto>,
      res: Response,
      next: NextFunction
    ) => {
      const data = await this.paymentService.createPaymentIntent(req.body);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  confirmPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.paymentService.confirmPaymentIntent(
        req.params.paymentIntentId
      );

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  cancelPayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.paymentService.cancelPaymentIntent(
        req.params.paymentIntentId
      );

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  retrievePayment = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.paymentService.retrievePaymentIntent(
        req.params.paymentIntentId
      );

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  handleWebhook = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.paymentService.handleWebhook(req);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );
}
