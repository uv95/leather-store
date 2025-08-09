import express from 'express';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';

import { itemRouter } from './routes/itemRouter';
import { userRouter } from './routes/userRouter';
import { cartRouter } from './routes/cartRouter';
import { orderRouter } from './routes/orderRouter';
import { analyticsRouter } from './routes/analyticsRouter';

import AppError from './utils/appError';
import { errorController } from './controllers/errorController';

const app = express();

app.use(cors());

//Set security http headers
app.use(helmet());

// Limit req from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 100,
  message: 'Too many requests from this IP, try again in an hour',
});
app.use('/', limiter);

app.use(express.json());

//Data sanitization against NoSQL query injections
app.use(mongoSanitize());
// against XSS
app.use(xss());
//prevent parameter pollution
app.use(
  hpp({
    whitelist: [],
  })
);

//ROUTES
app.use('/items', itemRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/analytics', analyticsRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page not found', 404));
});

app.use(errorController);

export { app };
