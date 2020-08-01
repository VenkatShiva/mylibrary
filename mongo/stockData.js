const { NSE500, Portfolio, mongoose } = require('./mongodb');

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

async function createPortFolio(name) {
  try {
    const create = await Portfolio.create({ name, stocks: [] });
    console.log(create);
  } catch (err) {
    console.log(err);
  }
}

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

// getNSE500stocks();

module.exports = {
  getNSE500stocks,
  createPortFolio,
  addStockToPortFolio,
  deleteStockFromPortfolio,
  updateStockInPortFolio,
};
