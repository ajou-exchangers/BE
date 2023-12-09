const {
	signupUser,
	loginUser,
	logoutUser,
	checkNicknameDup,
	verifyEmail,
} = require("../services/authService");

exports.signupUser = async (req, res, next) => {
	try {
		const imageUrl = req.file ? req.file.location : null;
		const { email, password, nickname } = req.body;
		await signupUser(email, password, nickname, imageUrl);
		res.status(201).send("user created");
	} catch (error) {
		next(error);
	}
};

exports.loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const loginResponse = await loginUser(req, email, password);
		res.status(200).json(loginResponse);
	} catch (error) {
		next(error);
	}
};

exports.logoutUser = async (req, res, next) => {
	try {
		await logoutUser(req);
		res.clearCookie("exchangers.sid");
		res.status(200).send("user logged out");
	} catch (error) {
		next(error);
	}
};

exports.checkNicknameDup = async (req, res, next) => {
	try {
		await checkNicknameDup(req.params.nickname);
		res.status(200).send("nickname is available");
	} catch (error) {
		next(error);
	}
};

exports.verifyEmail = async (req, res, next) => {
	try {
		const { user } = req.query;
		await verifyEmail(user);
		res.status(200).send("email verified");
		// TODO: redirect to FE login page
	} catch (error) {
		next(error);
	}
};
