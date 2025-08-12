import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import { xss } from 'express-xss-sanitizer';
import cors from 'cors';

import { userRouter } from './routes/userRouter';
import { cartRouter } from './modules/cart/cart.router';
import { orderRouter } from './modules/order/order.router';
import { itemRouter } from './modules/item/item.router';
import { addressRouter } from './modules/address/address.router';
import { analyticsRouter } from './modules/analytics/analytics.router';

import AppError from './utils/appError';
import { errorController } from './controllers/errorController';

const app = express();

app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP, try again in an hour',
});
app.use('/', limiter);

app.use(express.json());

// Data sanitization against NoSQL query injections
app.use(mongoSanitize());
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

app.use('/address', addressRouter);
app.use('/items', itemRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/analytics', analyticsRouter);

app.use((req, res, next) => {
  next(new AppError('Page not found', 404));
});

app.use(errorController);

export { app };
