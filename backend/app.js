const express = require('express');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const cors = require('cors');

const itemRouter = require('./routes/itemRouter');
const userRouter = require('./routes/userRouter');
const cartRouter = require('./routes/cartRouter');
const orderRouter = require('./routes/orderRouter');
const analyticsRouter = require('./routes/analyticsRouter');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const app = express();

app.use(cors());

//Set security http headers
app.use(helmet());

// Limit req from same API
const limiter = rateLimit({
  max: 100,
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

app.use(globalErrorHandler);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

module.exports = app;
