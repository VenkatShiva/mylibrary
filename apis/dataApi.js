const express = require('express');
const jwt = require('jsonwebtoken');
const {
  getNSE500stocks,
  getPortfolios,
  getParticularStocks,
  addPortfolio,
  getTodayPrices,
} = require('../mongo/stockData');

const dataRouter = express.Router({ mergeParams: true });

const secret = '*********';
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
    const portfolios = await getPortfolios(email);
    // const { portfolioName } = portfolios;
    if (portfolios === false) {
      res.status(500).send('Internal Error');
    } else {
      const statePortfolios = [];
      const allSymbols = [];
      portfolios.forEach((element) => {
        const oneport = {};
        const { portfolioName, stockList } = element;
        oneport.portfolioName = portfolioName;
        oneport.stockList = {};
        // for (let i = 0; i < stockList.length; i += 1) {
        //   // asd
        //   const { symbol, allStocks } = stockList[i];
        //   oneport.stockList[symbol] = {};
        //   oneport.stockList[symbol].allStocks = allStocks;
        //   allSymbols.push(symbol);
        //   // const stockDetails = await getParticularStock(symbol);
        //   // oneport.stockList[symbol].stock = stockDetails || {};
        // }
        stockList.forEach((stock) => {
          const { symbol, allStocks } = stock;
          oneport.stockList[symbol] = {};
          oneport.stockList[symbol].allStocks = allStocks;
          allSymbols.push(symbol);
        });
        statePortfolios.push(oneport);
      });
      // console.log('++>>', statePortfolios[0].stockList['HDFCBANK']);
      const stocksWithDetails = await getParticularStocks(allSymbols);
      if (stocksWithDetails.length) {
        statePortfolios.forEach((element) => {
          const { stockList } = element;
          const stocks = Object.keys(stockList);
          for (let x = 0; x < stocks.length; x += 1) {
            const index = stocksWithDetails.findIndex((elem) => elem.Symbol === stocks[x]);
            if (index > -1) {
              stockList[stocks[x]].stock = stocksWithDetails[index];
            }
          }
        });
      }
      const response = JSON.stringify({ portfolios: statePortfolios });
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
