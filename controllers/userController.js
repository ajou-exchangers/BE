const { getUserInfo } = require("../services/userService");

exports.getUserInfo = async (req, res, next) => {
	try {
		const { userId } = req.session.userId;
		const userInfoResponse = await getUserInfo(userId);
		res.status(200).json(userInfoResponse);
	} catch (error) {
		next(error);
	}
};

exports.getUserPosts = async (req, res, next) => {
	try {
		const { userId } = req.session.userId;
		const posts = await getUserPosts(userId);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

exports.getUserComments = async (req, res, next) => {
	try {
		const { userId } = req.session.userId;
		const comments = await getUserComments(userId);
		res.status(200).json(comments);
	} catch (error) {
		next(error);
	}
};
