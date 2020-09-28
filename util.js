const { getParticularStocks } = require('./mongo/stockData');

function getRandomNumber(min = 100000, max = 999999) {
  const mmin = Math.ceil(min);
  const mmax = Math.floor(max);
  return Math.floor(Math.random() * (mmax - mmin + 1)) + mmin;
}
async function getPortfolioAsreact(portfolios) {
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
  return statePortfolios;
}
module.exports = {
  getRandomNumber,
  getPortfolioAsreact,
};
