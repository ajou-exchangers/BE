const bcrypt = require("bcrypt");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const RESPONSE_MESSAGE = require("../constants/errorMessage");

exports.findUser = async (email, password) => {
	if (!email || !password)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.INVALID_ARGUMENT
		);
	const user = await User.findOne({ email });
	if (user != null && (await bcrypt.compare(password, user.password)))
		return user;
	else return null;
};

exports.findUserById = async (id) => {
	if (!id) throw CustomError(ERROR_CODES.BAD_REQUEST, "UserId is required");
	return await User.findById(id);
};

exports.findUserByNickname = async (nickname) => {
	if (!nickname)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Nickname is required");
	return await User.findOne({ nickname });
};

exports.createUser = async (email, password, nickname, imageUrl) => {
	if (!email || !password || !nickname)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.INVALID_ARGUMENT
		);

	dupEmailUser = await User.findOne({ email });
	dupNicknameUser = await User.findOne({ nickname });
	if (dupEmailUser || dupNicknameUser)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.USER_ALREADY_EXISTS
		);

	const hashedPasswd = await bcrypt.hash(password, 10);
	const user = new User({
		email,
		password: hashedPasswd,
		nickname,
		profile: imageUrl,
	});
	await user.save();
};
