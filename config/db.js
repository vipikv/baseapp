const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn('MONGO_URI is not set, skipping database connection');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;