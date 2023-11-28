const bcrypt = require("bcrypt");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.findUser = async (email, password) => {
	const user = await User.findOne({ email });
	if (!user) return null;
	else if (await bcrypt.compare(password, user.password)) return user;
	else return null;
};

exports.findUserById = async (id) => {
	return await User.findById(id);
};

exports.findUserByNickname = async (nickname) => {
	return await User.findOne({ nickname });
};

exports.createUser = async (email, password, nickname, profile) => {
	existUser = await User.findOne({ email });
	if (existUser)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "User already exists");
	const hashedPasswd = await bcrypt.hash(password, 10);
	const user = new User({
		email,
		password: hashedPasswd,
		nickname,
		profile,
	});
	await user.save();
};
