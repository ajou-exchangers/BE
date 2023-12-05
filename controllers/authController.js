const {
	findUser,
	createUser,
	findUserByNickname,
} = require("../services/userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const LoginResponse = require("../dto/response/LoginResponse");

exports.signupUser = async (req, res, next) => {
	try {
		const imageUrl = req.file ? req.file.location : null;
		const { email, password, nickname } = req.body;
		await createUser(email, password, nickname, imageUrl);
		res.status(201).send("user created");
	} catch (error) {
		next(error);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await findUser(email, password);
		if (user) {
			req.session.userId = user._id;
			res.status(200).json(new LoginResponse(user));
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
