const mongoose = require('mongoose');
const { mongoUri } = require('../config');

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
const ClinetSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});
const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: Number, required: true },
});
const normlSettings = { type: String, required: false };
const normalRequiredSettings = { type: String, required: true };

const NSE500 = new mongoose.Schema({
  'Company Name': { type: String, required: true },
  Industry: { type: String, required: true },
  Symbol: { type: String, required: true },
  'ISIN Code': { type: String, required: true },
});

const TodayMarket = new mongoose.Schema({
  SYMBOL: normalRequiredSettings,
  SERIES: normlSettings,
  OPEN: normlSettings,
  HIGH: normlSettings,
  LOW: normlSettings,
  CLOSE: normlSettings,
  PREVCLOSE: normlSettings,
  TOTTRDQTY: normlSettings,
  TOTTRDVAL: normlSettings,
  TOTALTRADES: normlSettings,
  ISIN: normalRequiredSettings,
});

const stockDetails = new mongoose.Schema({
  numberOfStocks: Number,
  price: Number,
  stockDate: String,
});
const Stock = new mongoose.Schema({
  symbol: normalRequiredSettings,
  allStocks: [
    stockDetails,
  ],
});
const EachPortfolio = new mongoose.Schema({
  portfolioName: normalRequiredSettings,
  stockList: [Stock],
});
const Portfolio = new mongoose.Schema({
  email: normalRequiredSettings,
  allPortfolios: [EachPortfolio],
});
module.exports = {
  Client: mongoose.model('Client', ClinetSchema),
  mongoose,
  Otp: mongoose.model('OTP', OTPSchema),
  NSE500: mongoose.model('NSE500', NSE500),
  TodayMarket: mongoose.model('TodayMarket', TodayMarket),
  Portfolio: mongoose.model('Portfolio', Portfolio),
};
