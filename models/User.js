const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	nickname: { type: String, required: true, unique: true },
	profile: { type: String },
	role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);
