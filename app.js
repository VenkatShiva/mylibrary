const express = require('express');
const chalk = require('chalk');


const app = express();
// console.log(dd);

// app.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', (req, res) => {
  const output = {
    result: 'Sample Output',
  };
  res.end(JSON.stringify(output));
});
app.post('/isreg', (req, res) => {
  const { email } = req.body;
});
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server started and listening on  ${chalk.green(port)}`);
});
