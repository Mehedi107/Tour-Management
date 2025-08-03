import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';

let server: Server;

const port = 5000;

const startServer = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://demoTodo:p72summ858Ib7wEj@cluster0.blfnk.mongodb.net'
    );

    console.log('🟢 MongoDB connected!');

    server = app.listen(port, () => {
      console.log(`🟢 Server is running on port ${port}`);
    });
  } catch (error) {
    console.log('❌ MongoDB connection failed!');
    console.log(error);
  }
};

startServer();
