const { Client, mongoose } = require('./mongodb');
// const { connection } = require('mongoose');


async function registerEmail(email, isVerified = false) {
  if (mongoose.connection.readyState === 1) {
    const client = new Client({ email, isVerified });
    const result = await client.save();
    // mongoose.connection.close();
    return result;
  }
  return false;
}

async function isEmailRegestered(email) {
  // console.log('state-->>', mongoose.connection.readyState);
  if (mongoose.connection.readyState === 1) {
    const result = await Client.findOne({ email });
    return result;
  }
  return false;
  // mongoose.connection.close();
}
// async function testFuns() {
//   const result = await isEmailRegestered('');
//   console.log(result);
// }
// testFuns();

module.exports = {
  registerEmail,
  isEmailRegestered,
};
