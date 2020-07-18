const jwt = require('jsonwebtoken');

const secret = 'shivajitheboss';
async function withAuth(req, res, next) {
  const { shivaToken } = req.cookies;
  // const shivaToken = jwt.sign({ email: 'shiva' }, secret, {
  //   expiresIn: '24h',
  // });
  if (!shivaToken) {
    res.status(200).send(JSON.stringify({ result: 'unauthrized' }));
  } else {
    // jwt.verify(shivaToken, secret, (err, decoded) => {
    //   if (err) {
    //     res.status(401).send('Unauthorized: Invalid token');
    //   } else {
    //     req.email = decoded.email;
    //     next();
    //   }
    // });
    try {
      const decode = await jwt.verify(shivaToken, secret);
      console.log(decode);
      next();
    } catch (err) {
      res.clearCookie('shivaToken', { httpOnly: true }).status(200).send(JSON.stringify({ result: 'tockenExpired' }));
      // res.status(401).send('Unauthorized: Invalid token');
    }
  }
}
module.exports = withAuth;
