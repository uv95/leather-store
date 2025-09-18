import { Request } from 'express';
import { Types } from 'mongoose';
import AppError from 'src/utils/appError';
import Stripe from 'stripe';
import Order, { OrderStatus } from '../order/model/order.model';
import { CreatePaymentIntentDto, UpdatePaymentDto } from './dto/payment.dto';
import Payment from './model/payment.model';

export class PaymentService {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new AppError('Stripe secret key not defined!', 500);
    }

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  private validateId(
    id: string,
    entity: 'User' | 'Order' | 'Payment' = 'Payment'
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(`${entity} id is invalid`, 400);
    }
  }

  async getAllPayments() {
    return await Payment.find();
  }

  async getAllPaymentsByUser(userId: string) {
    this.validateId(userId, 'User');

    return await Payment.find({ user: userId });
  }

  async getPayment(orderId: string) {
    this.validateId(orderId, 'Order');

    const payment = await Payment.findOne({ order: orderId });

    if (!payment) {
      throw new AppError('Payment data not found', 404);
    }

    return payment;
  }

  async createPaymentIntent(
    userId: string,
    { orderId, amount, currency = 'cad' }: CreatePaymentIntentDto
  ) {
    if (!amount || amount <= 0) {
      throw new AppError('Incorrect amount', 400);
    }

    if (!orderId) {
      throw new AppError('Order id not defined', 400);
    }

    this.validateId(userId, 'User');

    const payment = await Payment.create({
      order: orderId,
      user: userId,
      status: 'pending',
      amount,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      customer: userId,
      currency,
      metadata: { orderId, paymentId: String(payment._id) },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  }

  async retrievePaymentIntent(paymentIntentId: string) {
    const paymentIntent = await this.stripe.paymentIntents.retrieve(
      paymentIntentId
    );

    if (!paymentIntent) {
      throw new AppError('No Payment intent found!', 404);
    }

    return {
      id: paymentIntent.id,
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customer: paymentIntent.customer,
      metadata: paymentIntent.metadata,
    };
  }

  async confirmPaymentIntent(
    paymentIntentId: string,
    paymentMethodId = 'pm_card_visa'
  ) {
    const confirmedIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      { payment_method: paymentMethodId }
    );

    return {
      id: confirmedIntent.id,
      status: confirmedIntent.status,
    };
  }

  async cancelPaymentIntent(paymentIntentId: string) {
    const canceledPayment = await this.stripe.paymentIntents.cancel(
      paymentIntentId
    );

    return {
      id: canceledPayment.id,
      status: canceledPayment.status,
    };
  }

  async handleWebhook(request: Request) {
    if (!process.env.STRIPE_WEBHOOK_SECRET) {
      throw new AppError('Stripe webhook secret not defined!', 500);
    }

    let event: Stripe.Event = request.body;
    const signature = request.headers['stripe-signature'] || '';

    try {
      event = this.stripe.webhooks.constructEvent(
        request.body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      throw new AppError('Webhook signature verification failed', 400);
    }

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const { metadata } = event.data.object;
        const { orderId, paymentId } = metadata;

        return await this.handlePaymentIntentSucceeded({ orderId, paymentId });
      }

      case 'payment_intent.payment_failed': {
        const { metadata } = event.data.object;

        return await this.updatePayment(metadata.paymentId, {
          status: 'failed',
        });
      }

      case 'payment_intent.canceled': {
        const { metadata } = event.data.object;

        return await this.updatePayment(metadata.paymentId, {
          status: 'canceled',
        });
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }

  private async handlePaymentIntentSucceeded({
    paymentId,
    orderId,
  }: {
    paymentId: string;
    orderId: string;
  }) {
    await Order.findByIdAndUpdate(
      orderId,
      {
        status: OrderStatus.IN_PROGRESS,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    await this.updatePayment(paymentId, { status: 'paid' });
  }

  private async updatePayment(paymentId: string, dto: UpdatePaymentDto) {
    this.validateId(paymentId);

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      throw new AppError('Item not found', 404);
    }

    return await Payment.findByIdAndUpdate(paymentId, dto, {
      runValidators: true,
      new: true,
    });
  }
}
