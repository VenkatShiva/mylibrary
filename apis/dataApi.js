const express = require('express');
const { getNSE500stocks } = require('../mongo/stockData');

const dataRouter = express.Router({ mergeParams: true });

dataRouter.get('/', async (_req, res) => {
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

module.exports = {
  dataRouter,
};
