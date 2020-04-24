const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost:27017/shiva';
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const ClinetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  isVerified: { type: Boolean, default: false },
});

module.exports = { Client: mongoose.model('Client', ClinetSchema), mongoose };
