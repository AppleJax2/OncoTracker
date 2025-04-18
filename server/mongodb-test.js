const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

console.log('Attempting to connect to MongoDB...');

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000 // 10 seconds
})
  .then(() => {
    console.log('Successfully connected to MongoDB!');
    console.log('Connection state:', mongoose.connection.readyState);
    // Close the connection after success
    mongoose.connection.close()
      .then(() => {
        console.log('Connection closed.');
        process.exit(0);
      });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    console.error('MongoDB connection error code:', err.code);
    console.error('MongoDB connection error name:', err.name);
    process.exit(1);
  }); 