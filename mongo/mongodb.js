const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/shiva';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const ClinetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
});
const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
});
module.exports = { Client: mongoose.model('Client', ClinetSchema), mongoose, Otp: mongoose.model('OTP', OTPSchema) };
