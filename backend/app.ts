import express from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import { xss } from 'express-xss-sanitizer';
import cors from 'cors';

import { itemRouter } from './routes/itemRouter';
import { userRouter } from './routes/userRouter';
import { cartRouter } from './modules/cart/cart.router';
import { orderRouter } from './routes/orderRouter';
import { analyticsRouter } from './routes/analyticsRouter';

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
