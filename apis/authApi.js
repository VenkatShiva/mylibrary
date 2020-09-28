const express = require('express');
const jwt = require('jsonwebtoken');
const { registerEmail, isEmailRegestered } = require('../mongo/emails');
const { storeOtp, verifyOtp, deleteOtpFrmDB } = require('../mongo/otps');
const { sendMail } = require('../nodemailer/mailer');
const { getRandomNumber } = require('../util');

const authRouter = express.Router({ mergeParams: true });
const secret = 'shivajitheboss';


authRouter.post('/', async (req, res) => {
  try {
    // console.log('-->', req.body);
    if (req.body && req.body.email) {
      // console.log(req.body);
      const isReg = await isEmailRegestered(req.body.email);
      // console.log('-->came');
      if (isReg !== null && isReg !== false) {
        const shivaToken = jwt.sign({ email: req.body.email }, secret, {
          expiresIn: '24h',
        });
        res.cookie('shivaToken', shivaToken, { httpOnly: true }).status(200).send(JSON.stringify({ result: 'yes' }));
      } else if (isReg === null) {
        const randomNumber = getRandomNumber();
        const sendOtp = await storeOtp(req.body.email, randomNumber);
        if (sendOtp === false) {
          res.status(500).send('Internal Error');
        } else if (sendOtp) {
          const mailOtp = await sendMail(sendOtp.result.email, sendOtp.result.otp);
          if (mailOtp.accepted && mailOtp.accepted.indexOf(req.body.email) > -1) {
            res.status(200).send(JSON.stringify({ result: 'no', sent: true, status: sendOtp.status }));
          } else {
            res.status(200).send(JSON.stringify({ result: 'no', sent: false, reason: 'mailer' }));
          }
        } else {
          res.status(200).send(JSON.stringify({ result: 'no', sent: false, reason: 'mongo' }));
        }
        // res.status(200).send(JSON.stringify({ result: 'no' }));
      } else {
        res.status(200).send(JSON.stringify({ result: 'no', sent: false, reason: 'mongo' }));
      }
    } else {
      res.status(200).send(JSON.stringify({ result: 'noemail' }));
    }
  } catch (err) {
    // console.log('---->', req.body);
    console.log(err);
    res.status(500).send('Internal Error');
  }
  // console.log('-->', req.body);
});
authRouter.post('/verify', async (req, res) => {
  try {
    if (req.body && req.body.email && req.body.otp) {
      const otpVerified = await verifyOtp(req.body.email, req.body.otp);
      if (otpVerified === null) {
        res.status(200).send(JSON.stringify({ result: false, reason: 'internal' }));
      } else if (otpVerified) {
        const regMail = await registerEmail(req.body.email);
        if (regMail === false) {
          res.status(200).send(JSON.stringify({ result: false, reason: 'internal' }));
        } else if (regMail) {
          const shivaToken = jwt.sign({ email: req.body.email }, secret, {
            expiresIn: '24h',
          });
          res.cookie('shivaToken', shivaToken, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }).status(200).send(JSON.stringify({ result: true }));
          // sd
          deleteOtpFrmDB(req.body.email);
        } else {
          res.status(200).send(JSON.stringify({ result: false, reason: 'internal' }));
        }
      } else {
        res.status(200).send(JSON.stringify({ result: false, reason: 'wrong' }));
      }
    } else {
      res.status(200).send(JSON.stringify({ result: false, reason: 'noemail' }));
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Error');
  }
});
authRouter.get('/logout', async (req, res) => {
  try {
    res.clearCookie('shivaToken', { httpOnly: true }).status(200).send(JSON.stringify({ result: 'loggedOut' }));
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Error');
  }
  // console.log('-->', req.body);
});
module.exports = {
  authRouter,
};
