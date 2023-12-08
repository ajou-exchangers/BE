const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const { findUserById } = require("../services/userService");
const CustomError = require("../utils/CustomError");

exports.checkAuthenticated = async (req, res, next) => {
	if (req.session.userId && (await findUserById(req.session.userId))) {
		next();
	} else {
		next(
			CustomError(
				ERROR_CODES.UNAUTHORIZED,
				ERROR_MESSAGE.USER_NOT_AUTHORIZED
			)
		);
	}
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
