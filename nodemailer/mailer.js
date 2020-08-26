const nodemailer = require('nodemailer');

function getConnection() {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '*********',
        pass: '*******',
      },
    });
  } catch (err) {
    console.log('error');
    return false;
  }
}

const mailOptions = {
  from: '*********',
  subject: 'Authetication required..!',
};
async function sendMail(email, otp) {
  const options = { ...mailOptions, to: email, text: `This is your code ${otp}` };
  const transporter = await getConnection();
  return transporter.sendMail(options);
}

// async function mailService() {
//   const result = await sendMail('', 123456);
//   if (result && result.acaccepted.indexOf('') > 0) {
//     return true;
//   }
//   return false;
//   // console.log(result);
// }
// mailService();
module.exports = {
  sendMail,
};
