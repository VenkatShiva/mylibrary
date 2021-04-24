const express = require('express');
const jwt = require('jsonwebtoken');
const {
  getNSE500stocks,
  getPortfolios,
  addPortfolio,
  deletePortfolio,
  getTodayPrices,
} = require('../mongo/stockData');
const { getPortfolioAsreact } = require('../util');
const { email: importedEmail } = require('../config');
// const { getRandomNumber } = require('../util');

const dataRouter = express.Router({ mergeParams: true });

const secret = 'shivajitheboss';
async function getDecoded(req) {
  const { shivaToken } = req.cookies;
  const decode = await jwt.verify(shivaToken, secret);
  return decode;
}
dataRouter.get('/allstocks', async (_req, res) => {
  try {
    const allStocks = await getNSE500stocks();
    if (allStocks === false) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(JSON.stringify({ stocks: allStocks }));
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Error');
  }
});
dataRouter.get('/portfolios', async (req, res) => {
  const { shivaToken } = req.cookies;
  const decode = await jwt.verify(shivaToken, secret);
  try {
    //
    const { email } = decode;
    // const allPortFoliosWithMine = [];
    let myPortfolios = await getPortfolios(importedEmail);
    let yourPortfolios = [];
    if (email !== importedEmail) {
      yourPortfolios = await getPortfolios(email);
    }
    // const { portfolioName } = portfolios;
    if (yourPortfolios === false || myPortfolios === false) {
      res.status(500).send('Internal Error');
    } else {
      myPortfolios = await getPortfolioAsreact(myPortfolios);
      yourPortfolios = await getPortfolioAsreact(yourPortfolios);
      // const portfolios = [].concat(myPortfolios).concat(yourPortfolios);
      // const statePortfolios = [];
      const response = JSON.stringify({ myportfolio: myPortfolios, portfolios: yourPortfolios });
      // console.log(response);
      res.status(200).send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Error');
  }
});
dataRouter.post('/saveportfolio', async (req, res) => {
  if (req.body) {
    // console.log('body-->', JSON.stringify(req.body));
    const { shivaToken } = req.cookies;
    const decode = await jwt.verify(shivaToken, secret);
    const { email } = decode;
    const result = await addPortfolio(email, req.body);
    if (result && result.status) {
      // sd
      res.status(200).send(JSON.stringify({ success: true }));
    } else {
      res.status(500).send('Internal Error');
    }
  } else {
    res.status(500).send('Internal Error');
  }
});
dataRouter.post('/deleteportfolio', async (req, res) => {
  if (req.body) {
    const decode = await getDecoded(req);
    const result = await deletePortfolio(decode.email, req.body.portfolioName);
    if (result && result.status) {
      res.status(200).send(JSON.stringify({ success: true }));
    } else {
      res.status(500).send('Internal Error');
    }
  } else {
    res.status(500).send('Internal Error');
  }
});
dataRouter.post('/todayprices', async (req, res) => {
  // console.log('----->>><<<<<--------', req.body);
  if (req.body) {
    // console.log('body-->', JSON.stringify(req.body));
    const { symbols } = req.body;
    // console.log()
    const result = await getTodayPrices(symbols);
    if (result && result.status) {
      // sd
      res.status(200).send(JSON.stringify({ symbols: result.prices }));
    } else {
      res.status(500).send('Internal Error');
    }
  } else {
    res.status(500).send('Internal Error');
  }
});

module.exports = {
  dataRouter,
};
