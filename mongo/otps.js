const { Otp, mongoose } = require('./mongodb');

function registerOtp(email, otp) {
  const regotp = new Otp({ email, otp });
  return regotp.save();
}
function isOtpExist(email) {
  return Otp.findOne({ email });
}
function updateOtp(email, otp) {
  return Otp.findOneAndUpdate({ email }, { otp }, { new: true });
}
function deleteOtp(email) {
  return Otp.deleteOne({ email });
}

async function storeOtp(email, otp) {
  if (mongoose.connection.readyState === 1) {
    const otpExist = await isOtpExist(email);
    let result;
    if (otpExist == null) {
      result = await registerOtp(email, otp);
      // mongoose.connection.close();
      return { status: 'new', result };
    }
    result = await updateOtp(email, otp);
    // mongoose.connection.close();
    return { status: 'update', result };
  }
  return false;
}

async function verifyOtp(email, otp) {
  if (mongoose.connection.readyState === 1) {
    const otpSt = await isOtpExist(email);
    // console.log('--->-->', otpSt, otp);
    if (otp && otpSt.otp.toString() === otp) {
      return true;
    }
    return false;
  }
  return null;
}

async function deleteOtpFrmDB(email) {
  const delOtp = await deleteOtp(email);
  if (delOtp.ok) {
    return true;
  }
  return false;
}
// async function checkOtp() {
//   const result = await deleteOtpFrmDB('', 121089);
//   console.log(result);
// }
// checkOtp();
module.exports = {
  storeOtp,
  verifyOtp,
  deleteOtpFrmDB,
};
