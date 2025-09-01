import mongoose from 'mongoose';
import { app } from './app';

const DATABASE = process.env.DATABASE;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

const DB = DATABASE!.replace('<PASSWORD>', DATABASE_PASSWORD!);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful'))
  .catch((err) => {
    console.error('DB connection error:', err);
    process.exit(1);
  });

const port = process.env.PORT ? +process.env.PORT : 3000;
const server = app.listen(port, '0.0.0.0', () =>
  console.log(`App running on port ${port}...`)
);

process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION ❗️', err.name, err.message, err);
  process.exit(1);
});
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION ❗️', err.name, err.message);
  server.close(() => process.exit(1));
});
