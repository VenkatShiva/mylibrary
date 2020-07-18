const { Client } = require('./mongodb');


async function registerEmail(email, isVerified = false) {
  const client = new Client({ email, isVerified });
  const result = await client.save();
  // mongoose.connection.close();
  return result;
}

async function isEmailRegestered(email) {
  const result = await Client.findOne({ email });
  // mongoose.connection.close();
  return result;
}
// async function testFuns() {
//   const result = await isEmailRegestered('avenkatashiva@gmail.com');
//   console.log(result);
// }
// testFuns();

module.exports = {
  registerEmail,
  isEmailRegestered,
};
