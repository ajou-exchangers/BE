const DOMAINS = require("../constants/domains");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const UserInfoResponse = require("../dto/response/UserInfoResponse");
const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const { decrypt } = require("../utils/cryptoUtils");
const { sendMail } = require("./emailService");
const { createUser, findUser, findUserByNickname } = require("./userService");

exports.signupUser = async (email, password, nickname, imageUrl) => {
	if (!email || !password || !nickname)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.INVALID_ARGUMENT
		);

	if (!checkDomain(email))
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.INVALID_ARGUMENT
		);

	if (await checkDupUser(email, nickname))
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.USER_ALREADY_EXISTS
		);

	const user = await createUser(email, password, nickname, imageUrl);
	await sendMail(user._id.toString(), email);
};

exports.loginUser = async (req, email, password) => {
	const user = await findUser(email, password);
	if (!user)
		throw CustomError(
			ERROR_CODES.UNAUTHORIZED,
			ERROR_MESSAGE.INVALID_ARGUMENT
		);
	if (!user.emailVerified)
		throw CustomError(
			ERROR_CODES.UNAUTHORIZED,
			ERROR_MESSAGE.EMAIL_NOT_VERIFIED
		);

	req.session.userId = user._id;
	return new UserInfoResponse(user);
};

exports.logoutUser = async (req) => {
	await new Promise((resolve, reject) => {
		req.session.destroy((error) => {
			if (error) {
				reject(
					CustomError(
						ERROR_CODES.INTERNAL_SERVER,
						ERROR_MESSAGE.SESSION_DESTROY_FAILED
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
			ERROR_MESSAGE.NICKNAME_ALREADY_EXISTS
		);
	}
};

exports.verifyEmail = async (id) => {
	const user = await User.findById(decrypt(id));
	if (!user) {
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.USER_NOT_FOUND
		);
	}

	user.emailVerified = true;
	await user.save();
};

checkDomain = (email) => {
	return DOMAINS.some((domain) => email.endsWith(domain));
};

checkDupUser = async (email, nickname) => {
	let dupEmailUser = await User.findOne({ email });
	let dupNicknameUser = await User.findOne({ nickname });
	return dupEmailUser || dupNicknameUser;
};
