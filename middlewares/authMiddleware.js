const ERROR_CODES = require("../constants/errorCodes");
const { findUserById } = require("../services/userService");
const CustomError = require("../utils/CustomError");

exports.checkAuthenticated = async (req, res, next) => {
	if (req.session.userId && (await findUserById(req.session.userId))) {
		next();
	} else {
		throw CustomError(ERROR_CODES.UNAUTHORIZED, "User not authenticated");
	}
};

exports.checkNotAuthenticated = async (req, res, next) => {
	if (req.session.userId && (await findUserById(req.session.userId))) {
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			"User already authenticated"
		);
	} else {
		next();
	}
};
