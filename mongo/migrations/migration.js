const csvtojson = require('csvtojson');
const extract = require('extract-zip');
const request = require('superagent');
const fs = require('fs');

const { NSE500, TodayMarket, mongoose } = require('../mongodb');

async function getCSVdata(csvFilePath = 'Equityneww.csv') {
  let jsonArray = []; // `${__dirname}/${csvFilePath}`
  try {
    jsonArray = await csvtojson().fromFile(csvFilePath);
  } catch (err) {
    console.log(err);
  }
  // for(let i = 0;i < jsonArray.length;i++) {
  //   if(!jsonArray[i]['Industry']) {
  //     console.log(jsonArray[i]);
  //   }
  // }
  return jsonArray;
}
async function insertNSE500toMongo() {
  try {
    const listOfCom = await getCSVdata();
    console.log(listOfCom);
    const saved = await NSE500.insertMany(listOfCom);
    return saved;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateNSE500() {
  try {
    const delteAll = await NSE500.deleteMany({});
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
// cm30JUL2020bhav.csv (2).zip
// https://www1.nseindia.com/content/historical/EQUITIES/2020/JUL/cm30JUL2020bhav.csv.zip
function generateFilename() {
  const datetime = new Date();
  const day = datetime.getDay();
  if (day < 1 && day > 5) {
    return false;
  }
  const year = datetime.getFullYear();
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const month = monthNames[datetime.getMonth()];
  let date;
  const hours = datetime.getHours();
  if (hours < 18) {
    date = datetime.getDate() - 1;
  } else {
    date = datetime.getDate();
  }
  const filename = `cm${date}${month}${year}bhav.csv.zip`;
  console.log(filename);
  return { filename, month };
}

async function downloadAndUnzip(fileinfo) {
  const { filename, month } = fileinfo;
  const filepath = `${__dirname}/today/${filename}`;
  const dirpath = `${__dirname}/today`;
  fs.rmdirSync(dirpath, { recursive: true });
  fs.mkdirSync(dirpath);
  request
    .get(`http://www1.nseindia.com/content/historical/EQUITIES/2020/${month}/${filename}`)
    .on('error', (error) => {
      console.log(error);
    })
    .pipe(fs.createWriteStream(filepath))
    .on('finish', async () => {
      console.log('finished dowloading');
      await extract(filepath, { dir: `${dirpath}/` });
      fs.unlinkSync(filepath);
      console.log('finished unzip');
      await updateTOdayData(filepath.slice(0, -4));
      console.log('Data updated');
      mongoose.connection.close();
    });
}

function doMigration() {
  const filname = generateFilename();
  if (filname) {
    downloadAndUnzip(filname);
  }
  return true;
}

doMigration();
// updateNSE500();
// getCSVdata();
// updateTOdayData('16072020.csv');


// createPortFolio('MyPortfolio');
// addStockToPortFolio('MyPortfolio', '1234', 6);

// updateStockInPortFolio('MyPortfolio', '1234', 9);

module.exports = {
  NSE500,
  updateNSE500,
  updateTOdayData,
  doMigration,
};
