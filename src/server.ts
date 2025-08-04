import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { envVars } from './app/config/env';

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log('🟢 MongoDB connected!');

    server = app.listen(envVars.PORT, () => {
      console.log(`🟢 Server is running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log('❌ MongoDB connection failed!');
    console.log(error);
  }
};

startServer();

/* 
✅ unhandledRejection error (if developer forget to handle any promise error)
✅ uncaughtException error (if developer forget to handle any local error like declared any variable but do not use it)
✅ signal termination error
*/

// 🔴 unhandled rejection error
process.on('unhandledRejection', error => {
  console.log('Unhandled Rejection caught. Server is shutting down...', error);

  if (server) {
    server.close(() => process.exit(1));
  }

  process.exit(1);
});
// Promise.reject(new Error('🔴 I forgot to catch this promise...'));

// 🔴 uncaughtException error
process.on('uncaughtException', error => {
  console.log('uncaughtException caught. Server is shutting down...', error);

  if (server) {
    server.close(() => process.exit(1));
  }

  process.exit(1);
});
// throw new Error('🔴 I forgot to handle local error');

// 🔴 SIGTERM error
process.on('SIGTERM', () => {
  console.log('SIGTERM caught. Server is shutting down...');

  if (server) {
    server.close(() => process.exit(1));
  }

  process.exit(1);
});
