const mongoose = require('mongoose');

const UserModel = require('./models/user.model');

if (typeof process.env.DB_CONNECTION_URL === 'undefined') throw new Error('DB_CONNECTION_URL required in env, but it was undefined.')


mongoose.connect(process.env.DB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: false, useCreateIndex: true }, function (err) {
  if (err) {
    console.log(`Could not connect to mongodb on ${process.env.DB_CONNECTION_URL}. Ensure that you have mongodb running on ${process.env.DB_CONNECTION_URL} and mongodb accepts connections on the ports!`);
    console.log(`\n\n\n\n❌ ❌ ❌ worker could not connect to mongo \n\n\n\n`)
  } else {
    console.log(`\n\n\n\n👍 👍 👍 worker connected to mongo \n\n\n\n`)
    main();
  }
});


async function main() {
	const users = await UserModel.find();
	for (user of users) {
		console.log(user)
	}
}