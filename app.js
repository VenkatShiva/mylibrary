const express = require('express');
const chalk = require('chalk');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
// const jwt = require('jsonwebtoken');
const withAuth = require('./middlewares/authmiddleware');
const { authRouter } = require('./apis/authApi');
const { dataRouter } = require('./apis/dataApi');
const { port: portFromCOnnfig, machineAddress } = require('./config');

const app = express();
// console.log(dd);
// const corsOptions = {
//   origin: ' http://localhost:3000',
//   optionsSuccessStatus: 200,
// };
app.use(express.static(path.join(__dirname, 'build')));
const whitelist = [machineAddress];
const corsOptions = {
  credentials: true,
  origin(origin, callback) {
    if (!origin) {
      callback(null, true);
    } else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json());
app.use((req, _res, next) => {
  // res.header('Access-Control-Allow-Credentials', true);
  const fullUrl = `${req.method} : ${req.protocol}://${req.get('host')}${req.originalUrl}`;
  console.log(fullUrl);
  next();
});

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});
app.use('/auth', authRouter);
app.use(withAuth);
app.get('/', (req, res) => {
  // console.log(req.email);
  res.status(200).send(JSON.stringify({ result: 'Ok', email: req.email }));
});

app.use('/data', dataRouter);
// app.get('/checkToken', withAuth, (req, res) => {
// });

const port = process.env.PORT || portFromCOnnfig || 9000;
app.listen(port, () => {
  console.log(`Server started and listening on  ${chalk.green(port)}`);
});
