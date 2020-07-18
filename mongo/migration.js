const csvtojson = require('csvtojson');

const { NSE500, TodayMarket, Portfolio } = require('./mongodb');

async function getCSVdata(csvFilePath = 'nse500.csv') {
  let jsonArray;
  try {
    jsonArray = await csvtojson().fromFile(`${__dirname}/${csvFilePath}`);
    // console.log(jsonArray);
  } catch (err) {
    console.log(err);
  }
  return jsonArray;
}
async function insertNSE500toMongo() {
  try {
    const listOfCom = await getCSVdata();
    const saved = await NSE500.insertMany(listOfCom);
    return saved;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateNSE500() {
  try {
    const delteAll = await NSE500.remove({});
    if (delteAll.ok) {
      const saved = await insertNSE500toMongo();
      console.log('saved-->', saved && saved.length);
    }
  } catch (err) {
    console.log(err);
  }
}

async function insertTodayData(path = '15062020.csv') {
  try {
    const listOfComData = await getCSVdata(path);
    const saved = await TodayMarket.insertMany(listOfComData);
    // console.log('saved-->', saved && saved.length);
    return saved;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateTOdayData(path) {
  try {
    const delteAll = await TodayMarket.deleteMany({});
    if (delteAll.ok) {
      const saved = await insertTodayData(path);
      console.log('saved-->', saved && saved.length);
    }
  } catch (err) {
    console.log(err);
  }
}

// updateTOdayData('16072020.csv');

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
// createPortFolio('MyPortfolio');
// addStockToPortFolio('MyPortfolio', '1234', 6);

// updateStockInPortFolio('MyPortfolio', '1234', 9);

module.exports = {
  NSE500,
  updateNSE500,
  updateTOdayData,
  createPortFolio,
  addStockToPortFolio,
  deleteStockFromPortfolio,
};
