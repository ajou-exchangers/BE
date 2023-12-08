const {
	getUserInfo,
	getUserPosts,
	getUserComments,
} = require("../services/userService");

exports.getUserInfo = async (req, res, next) => {
	try {
		const userInfoResponse = await getUserInfo(req.session.userId);
		res.status(200).json(userInfoResponse);
	} catch (error) {
		next(error);
	}
};

exports.getUserPosts = async (req, res, next) => {
	try {
		const posts = await getUserPosts(req.session.userId);
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

exports.getUserComments = async (req, res, next) => {
	try {
		const comments = await getUserComments(req.session.userId);
		res.status(200).json(comments);
	} catch (error) {
		next(error);
	}
};
