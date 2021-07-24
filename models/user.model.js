
const mongoose = require('mongoose');
const { Schema } = mongoose;

const User = new Schema({
	id: { unique: true, type: String, required: true },
	login: { type: String, required: true },
	displayName: { type: String, required: true },
	profileImageUrl: { type: String, required: true },
	email: { type: String, required: true }
})



module.exports = mongoose.model('User', User)