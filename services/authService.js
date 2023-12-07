const DOMAINS = require("../constants/domains");
const ERROR_CODES = require("../constants/errorCodes");
const RESPONSE_MESSAGE = require("../constants/errorMessage");
const LoginResponse = require("../dto/response/LoginResponse");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const { createUser, findUser, findUserByNickname } = require("./userService");

exports.signupUser = async (email, password, nickname, imageUrl) => {
	if (!email || !password || !nickname)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.INVALID_ARGUMENT
		);

	if (!checkDomain(email))
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.INVALID_ARGUMENT
		);

	if (await checkDupUser(email, nickname))
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.USER_ALREADY_EXISTS
		);

	await createUser(email, password, nickname, imageUrl);
};

exports.loginUser = async (req, email, password) => {
	const user = await findUser(email, password);
	if (user) {
		req.session.userId = user._id;
		return new LoginResponse(user);
	} else {
		throw CustomError(
			ERROR_CODES.UNAUTHORIZED,
			RESPONSE_MESSAGE.INVALID_ARGUMENT
		);
	}
};

exports.logoutUser = async (req) => {
	await new Promise((resolve, reject) => {
		req.session.destroy((error) => {
			if (error) {
				reject(
					CustomError(
						ERROR_CODES.INTERNAL_SERVER,
						RESPONSE_MESSAGE.SESSION_DESTROY_FAILED
					)
				);
			} else {
				resolve();
			}
		});
	});
};

exports.checkNicknameDup = async (nickname) => {
	const user = await findUserByNickname(nickname);
	if (user) {
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.NICKNAME_ALREADY_EXISTS
		);
	}
};

checkDomain = (email) => {
	return DOMAINS.some((domain) => email.endsWith(domain));
};

checkDupUser = async (email, nickname) => {
	let dupEmailUser = await User.findOne({ email });
	let dupNicknameUser = await User.findOne({ nickname });
	return dupEmailUser || dupNicknameUser;
};
