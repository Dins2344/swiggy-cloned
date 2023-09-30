const mongoose = require('mongoose');
const mongoDBURL = 'mongodb://0.0.0.0:27017'; // Replace with your MongoDB connection URL


const connect = async () => {
  const dbName = 'reactWebApp';

  try {
    await mongoose.connect(mongoDBURL, {
      dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

const User = require('../schemas/userSchema').User;
const admin = require('../schemas/adminSchema').admin;

const db = {
  connect,
  connection: mongoose.connection,
  User,
  Admin: admin,
};

module.exports = db;




