const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const { findUserById } = require("../services/userService");
const CustomError = require("../utils/CustomError");

exports.checkAuthenticated = async (req, res, next) => {
	if (!req.session.userId)
		return next(
			CustomError(
				ERROR_CODES.UNAUTHORIZED,
				ERROR_MESSAGE.USER_NOT_AUTHORIZED
			)
		);
	const user = await findUserById(req.session.userId);
	if (!user.emailVerified)
		return next(
			CustomError(
				ERROR_CODES.UNAUTHORIZED,
				ERROR_MESSAGE.EMAIL_NOT_VERIFIED
			)
		);
	next();
};

exports.checkNotAuthenticated = async (req, res, next) => {
	if (req.session.userId && (await findUserById(req.session.userId))) {
		next(
			CustomError(
				ERROR_CODES.BAD_REQUEST,
				ERROR_MESSAGE.USER_ALREADY_AUTHORIZED
			)
		);
	} else {
		next();
	}
};
