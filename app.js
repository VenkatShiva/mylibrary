const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// const jwt = require('jsonwebtoken');
const withAuth = require('./middlewares/authmiddleware');

const app = express();
// console.log(dd);
app.use(cors());
app.use((req, _res, next) => {
  const fullUrl = `${req.method} : ${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(fullUrl);
  next();
});

app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use(withAuth);
app.get('/', (req, res) => {
  res.status(200).send(JSON.stringify({ result: 'Ok' }));
});

// app.get('/checkToken', withAuth, (req, res) => {
// });

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started and listening on  ${chalk.green(port)}`);
});
