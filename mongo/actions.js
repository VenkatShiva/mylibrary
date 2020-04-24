const { Client, mongoose } = require('./mongodb');


// function checkReg( email ) {

// }

function regClient(email, isVerified) {
  const client = new Client({ email, isVerified });
  return client.save();
}

function checkExist(email) {
  return Client.findOne({ email });
}

async function checkRegClient() {
  try {
    await regClient('avenkatashiva@gmail.com', true);
    console.log('Success');
    mongoose.connection.close();
    return { status: 'Success' };
  } catch (err) {
    console.log(err);
    return { status: 'Internal Error' };
  }
}
async function checkExisttFun() {
  const count = await checkExist('avenkatashiva@gmail.com');
  mongoose.connection.close();
  console.log(count);
}
// checkRegClient();
checkExisttFun();
