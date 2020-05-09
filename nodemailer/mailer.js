const nodemailer = require('nodemailer');

function getConnection() {
  try {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '*************************',
        pass: '******',
      },
    });
  } catch (err) {
    console.log('error');
    return false;
  }
}

const mailOptions = {
  from: '*******************',
  subject: 'Authetication required..!',
};
async function sendMail(email) {
  const options = { ...mailOptions, to: email, text: 'This is your code 12345' };
  const transporter = await getConnection();
  return transporter.sendMail(options);
}

async function mailService() {
  const result = await sendMail('*******************');
  console.log(result);
}

mailService();
