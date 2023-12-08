const bcrypt = require("bcrypt");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const UserInfoResponse = require("../dto/response/LoginResponse");

exports.findUser = async (email, password) => {
	if (!email || !password)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.INVALID_ARGUMENT
		);
	const user = await User.findOne({ email });
	if (user != null && (await bcrypt.compare(password, user.password)))
		return user;
	else return null;
};

exports.findUserById = async (id) => {
	if (!id)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.INVALID_ARGUMENT
		);
	return await User.findById(id);
};

exports.findUserByNickname = async (nickname) => {
	if (!nickname)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.INVALID_ARGUMENT
		);
	return await User.findOne({ nickname });
};

exports.createUser = async (email, password, nickname, imageUrl) => {
	const hashedPasswd = await bcrypt.hash(password, 10);
	const user = new User({
		email,
		password: hashedPasswd,
		nickname,
		profile: imageUrl,
	});
	await user.save();
};
