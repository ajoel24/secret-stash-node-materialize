if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const mongoose = require('mongoose');

const db = process.env.MONGO_URI;

/**
 * Since mongoose.connect returns a Promise, we use async/await
 * to connect to MongoDB cloud DB.
 * Also, exceptions are handled using try-catch.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
