const express = require('express');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');

const itemRouter = require('./routes/itemRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const addressRouter = require('./routes/addressRouter');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

//Set security http headers
app.use(helmet());

// Limit req from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000, //allow 100 requests from the same IP in 1h
  message: 'Too many requests from this IP, try again in an hour',
});
app.use('/api', limiter);

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

app.all('*', (req, res, next) => {
  next(new AppError('Страница не найдена', 404));
});

app.use(globalErrorHandler);

module.exports = app;
