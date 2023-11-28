const {
	findUser,
	createUser,
	findUserByNickname,
} = require("../services/userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.signupUser = async (req, res, next) => {
	try {
		await createUser(
			req.body.email,
			req.body.password,
			req.body.nickname,
			req.body.profile // TODO: s3 upload
		);
		res.status(201).send("user created");
	} catch (error) {
		next(error);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const user = await findUser(req.body.email, req.body.password);
		if (user) {
			req.session.userId = user._id;
			res.status(200).send("user logged in");
		} else {
			throw CustomError(
				ERROR_CODES.UNAUTHORIZED,
				"Invalid username or password"
			);
		}
	} catch (error) {
		next(error);
	}
};

exports.logoutUser = async (req, res, next) => {
	try {
		await new Promise((resolve, reject) => {
			req.session.destroy((error) => {
				if (error) {
					reject(
						CustomError(
							ERROR_CODES.INTERNAL_SERVER_ERROR,
							"Failed to destroy session"
						)
					);
				} else {
					resolve();
				}
			});
		});
		res.clearCookie("exchangers.sid");
		res.status(200).send("user logged out");
	} catch (error) {
		next(error);
	}
};

exports.checkNicknameDup = async (req, res, next) => {
	try {
		const user = await findUserByNickname(req.params.nickname);
		if (user) {
			throw CustomError(
				ERROR_CODES.BAD_REQUEST,
				"nickname already exists"
			);
		} else {
			res.status(200).send("nickname available");
		}
	} catch (error) {
		next(error);
	}
};
