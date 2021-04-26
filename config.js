module.exports = {
  email: 'avenkatashiva@gmail.com',
  siteEmail: 'venkatashiva.site@gmail.com',
  password: 'P@@ji143',
  machineAddress: process.env.prod ? ['http://18.219.30.68:3000', 'http://ec2-18-219-30-68.us-east-2.compute.amazonaws.com:3000'] : ['http://localhost:3000'],
  port: 9000,
  mongoUri: process.env.prod ? 'mongodb+srv://shiva:shiva@cluster0.db69m.mongodb.net/shiva' : 'mongodb://localhost:27017/shiva',
};
