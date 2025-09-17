import { Request } from 'express';
import AppError from 'src/utils/appError';
import Stripe from 'stripe';
import Order, { OrderStatus } from '../order/model/order.model';
import {
  ConfirmPaymentIntentDto,
  CreatePaymentIntentDto,
} from './dto/payment.dto';

export class PaymentService {
  private stripe: Stripe;

  constructor() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new AppError('Stripe secret key not defined!', 500);
    }

    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  async createPaymentIntent({
    orderId,
    amount,
    currency = 'cad',
  }: CreatePaymentIntentDto) {
    if (!amount || amount <= 0) {
      throw new AppError('Incorrect amount', 400);
    }

    if (!orderId) {
      throw new AppError('Order id not defined', 400);
    }

    const paymentIntent = await this.stripe.paymentIntents.create({
      amount,
      currency,
      metadata: { orderId },
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
      metadata: paymentIntent.metadata,
    };
  }

  async confirmPaymentIntent({
    paymentIntentId,
    paymentMethodId = 'pm_card_visa',
  }: ConfirmPaymentIntentDto) {
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
      case 'payment_intent.succeeded':
        const { metadata } = event.data.object;
        return await this.handlePaymentIntentSucceeded(metadata.orderId);
        break;
      case 'payment_intent.payment_failed':
        return {
          status: 'failed',
          message: 'Payment failed. Please try another card.',
        };
      case 'payment_intent.canceled':
        return {
          status: 'canceled',
          message: 'Payment was canceled by user.',
        };
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  }

  private async handlePaymentIntentSucceeded(orderId: string) {
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

    return {
      status: 'succeeded',
      message: 'The order is paid!',
    };
  }
}
