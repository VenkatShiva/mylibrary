const {
  NSE500, Portfolio, TodayMarket, mongoose,
} = require('./mongodb');
const { email: importedEmail } = require('../config');

async function getNSE500stocks() {
  let dataNSE500 = [];
  try {
    // console.log('came->', mongoose.connection.readyState);
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      dataNSE500 = await NSE500.find({});
      // console.log(dataNSE500);
    } else {
      return false;
    }
    // console.log(dataNSE500);
  } catch (err) {
    console.log(err);
  }
  return dataNSE500;
}
async function getParticularStocks(symbols) {
  // Symbol
  let particular = {};
  try {
    // console.log('came->', mongoose.connection.readyState);
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      particular = await NSE500.find({ Symbol: symbols });
      // console.log(particular);
    } else {
      return false;
    }
    // console.log(dataNSE500);
  } catch (err) {
    console.log(err);
  }
  // console.log('came--->>>', particular);
  return particular;
}
getParticularStocks();
// eslint-disable-next-line no-unused-vars
const dummyPortfolio = {
  email: importedEmail,
  allPortfolios: [
    {
      portfolioName: "Shiva's Portfolio",
      stockList: [
        {
          symbol: 'HDFCBANK',
          allStocks: [
            {
              numberOfStocks: 1,
              price: 1111.65,
              stockDate: '13-07-2020',
            },
            {
              numberOfStocks: 1,
              price: 1057,
              stockDate: '14-07-2020',
            },
            {
              numberOfStocks: 1,
              price: 1060,
              stockDate: '29-07-2020',
            },
            {
              numberOfStocks: 1,
              price: 1030,
              stockDate: '31-07-2020',
            },
          ],
        },
        {
          symbol: 'ICICIBANK',
          allStocks: [
            {
              numberOfStocks: 3,
              price: 353,
              stockDate: '13-07-2020',
            },
            {
              numberOfStocks: 3,
              price: 343,
              stockDate: '16-07-2020',
            },
          ],
        },
        {
          symbol: 'VEDL',
          allStocks: [
            {
              numberOfStocks: 16,
              price: 62.75,
              stockDate: '03-04-2020',
            },
          ],
        },
        {
          symbol: 'ITC',
          allStocks: [
            {
              numberOfStocks: 6,
              price: 192,
              stockDate: '21-07-2020',
            },
            {
              numberOfStocks: 2,
              price: 189,
              stockDate: '01-09-2020',
            },
            {
              numberOfStocks: 4,
              price: 184,
              stockDate: '11-09-2020',
            },
          ],
        },
        {
          symbol: 'BANDHANBNK',
          allStocks: [
            {
              numberOfStocks: 3,
              price: 299.6,
              stockDate: '06-08-2020',
            },
          ],
        },
        {
          symbol: 'MAGMA',
          allStocks: [
            {
              numberOfStocks: 28,
              price: 15.3,
              stockDate: '08-06-2020',
            },
          ],
        },
        {
          symbol: 'CUB',
          allStocks: [
            {
              numberOfStocks: 10,
              price: 121.0,
              stockDate: '30-06-2020',
            },
            {
              numberOfStocks: 4,
              price: 132.1,
              stockDate: '10-07-2020',
            },
            {
              numberOfStocks: 4,
              price: 121.6,
              stockDate: '15-07-2020',
            },
            {
              numberOfStocks: 3,
              price: 117.4,
              stockDate: '04-08-2020',
            },
            {
              numberOfStocks: 3,
              price: 117.0,
              stockDate: '13-08-2020',
            },
          ],
        },
        {
          symbol: 'YESBANK',
          allStocks: [
            {
              numberOfStocks: 11,
              price: 11.7,
              stockDate: '13-07-2020',
            },
            {
              numberOfStocks: 13,
              price: 11.95,
              stockDate: '29-07-2020',
            },
            {
              numberOfStocks: 16,
              price: 13.45,
              stockDate: '06-08-2020',
            },
            {
              numberOfStocks: 2,
              price: 13.9,
              stockDate: '07-08-2020',
            },
            {
              numberOfStocks: 8,
              price: 14.8,
              stockDate: '24-08-2020',
            },
            {
              numberOfStocks: 11,
              price: 14.9,
              stockDate: '24-08-2020',
            },
            {
              numberOfStocks: 14,
              price: 13.99,
              stockDate: '24-08-2020',
            },
          ],
        },
        {
          symbol: 'BHEL',
          allStocks: [
            {
              numberOfStocks: 22,
              price: 22.4,
              stockDate: '20-04-2020',
            },
            {
              numberOfStocks: 1,
              price: 22.35,
              stockDate: '20-04-2020',
            },
          ],
        },
        {
          symbol: 'IDFCFIRSTB',
          allStocks: [
            {
              numberOfStocks: 32,
              price: 27.5,
              stockDate: '13-07-2020',
            },
            {
              numberOfStocks: 6,
              price: 25.9,
              stockDate: '14-07-2020',
            },
            {
              numberOfStocks: 7,
              price: 26.0,
              stockDate: '15-07-2020',
            },
            {
              numberOfStocks: 6,
              price: 26.7,
              stockDate: '31-07-2020',
            },
            {
              numberOfStocks: 6,
              price: 26.3,
              stockDate: '31-07-2020',
            },
            {
              numberOfStocks: 1,
              price: 32,
              stockDate: '27-08-2020',
            },
            {
              numberOfStocks: 2,
              price: 30,
              stockDate: '27-08-2020',
            },
            {
              numberOfStocks: 7,
              price: 30.3,
              stockDate: '27-08-2020',
            },
          ],
        },
        {
          symbol: 'SBILIFE',
          allStocks: [
            {
              numberOfStocks: 1,
              price: 836,
              stockDate: '27-08-2020',
            },
          ],
        },
        {
          symbol: 'HDFCLIFE',
          allStocks: [
            {
              numberOfStocks: 2,
              price: 580,
              stockDate: '31-08-2020',
            },
          ],
        },
      ],
    },
  ],
};
async function createPortFolio(email, containerPort) {
  let create = false;
  try {
    const total = {
      email,
      allPortfolios: [containerPort],
    };
    create = await Portfolio.insertMany(total);
  } catch (err) {
    console.log(err);
  }
  return create;
}
// db.portfolios.findOneAndUpdate({email:''},{
//  $pull: {
//         allPortfolios: { portfolioName: 'shivaji' },
//       },
// })
async function addPortfolio(email, portfolio) {
  try {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      // console.log(email, portfolio);
      const existedPortfolios = await Portfolio.findOne({ email });
      if (existedPortfolios) {
        const updated = await Portfolio.updateOne({ email }, {
          $push: {
            allPortfolios: portfolio,
          },
        });
        return { status: true, updated };
      }
      const created = await createPortFolio(email, portfolio);
      return { status: true, created };
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
async function deletePortfolio(email, portfolioName) {
  try {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      const updated = await Portfolio.findOneAndUpdate({ email }, {
        $pull: {
          allPortfolios: { portfolioName },
        },
      });
      return { status: true, updated };
    }
    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
// addPortfolio('avenkatashiva@gmail.com', dummyPortfolio.allPortfolios[0]);
async function updatePortFolio(email, data) {
  try {
    const deleted = await Portfolio.deleteMany({ email });
    if (deleted.ok) {
      const create = await Portfolio.insertMany(data);
      console.log(create);
    }
  } catch (err) {
    console.log(err);
  }
}
async function getPortfolios(email) {
  let allPortfolio = [];
  try {
    if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
      const portfolio = await Portfolio.findOne({ email });
      if (portfolio && portfolio.allPortfolios) {
        allPortfolio = portfolio.allPortfolios;
      }
    }
  } catch (err) {
    console.log(err);
  }
  return allPortfolio;
}
// updatePortFolio('avenkatashiva@gmail.com', dummyPortfolio);
async function addStockToPortFolio(name, isin, number) {
  try {
    const updated = await Portfolio.updateOne({ name }, {
      $push: {
        stocks: { isin, number },
      },
    });
    console.log(updated);
  } catch (err) {
    console.log(err);
  }
}
async function deleteStockFromPortfolio(name, isin) {
  try {
    const updated = await Portfolio.findOneAndUpdate({ name }, {
      $pull: {
        stocks: { isin },
      },
    });
    console.log(updated);
  } catch (err) {
    console.log(err);
  }
}

async function updateStockInPortFolio(name, isin, number) {
  try {
    const updated = await Portfolio.findOneAndUpdate(
      { name },
      {
        $set: {
          'stocks.$[elem].number': number,
        },
      },
      {
        arrayFilters: [{ 'elem.isin': isin }],
      },
    );
    console.log(updated);
  } catch (err) {
    console.log(err);
  }
}

async function getTodayPrices(symbols) {
  const prices = {};
  if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
    // we
    try {
      const allPrices = await TodayMarket.find({
        SYMBOL: symbols,
        SERIES: 'EQ',
      });
      if (allPrices && allPrices.length > 0) {
        allPrices.forEach((price) => {
          prices[price.SYMBOL] = price.CLOSE;
        });
      }
      // console.log(prices);
      return { status: true, prices };
    } catch (err) {
      console.log(err);
    }
  }
  return { status: false };
}
// getTodayPrices(['VEDL', 'CUB', 'ITC', 'IDFCFIRSTB']);

module.exports = {
  getNSE500stocks,
  createPortFolio,
  addStockToPortFolio,
  deleteStockFromPortfolio,
  updateStockInPortFolio,
  getPortfolios,
  updatePortFolio,
  getParticularStocks,
  addPortfolio,
  getTodayPrices,
  deletePortfolio,
};
