const { mongoose, Otp } = require('./mongodb');

function registerOtp(email, otp) {
  const regotp = new Otp({ email, otp, date: new Date() });
  return regotp.save();
}
function isOtpExist(email) {
  return Otp.findOne({ email });
}
function updateOtp(email, otp) {
  return Otp.findOneAndUpdate({ email }, { otp }, { new: true });
}

async function storeOtp(email, otp) {
  const otpExist = await isOtpExist(email);
  let result;
  if (otpExist == null) {
    result = await registerOtp(email, otp);
    mongoose.connection.close();
    return { status: 'new', result };
  }
  result = await updateOtp(email, otp);
  mongoose.connection.close();
  return { status: 'update', result };
}

// async function checkOtp() {
//   const result = await storeOtp('avenkatashiva@gmail.com', 123458);
//   console.log(result);
// }
// checkOtp();
module.exports = {
  storeOtp,
};
