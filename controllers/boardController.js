const {
	findPost,
	findAllPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
} = require("../services/boardService");
const {
	updateComment,
	createComment,
	deleteComment,
	likeComment,
} = require("../services/commentService");

exports.getBoard = async (req, res, next) => {
	try {
		const posts = await findAllPosts();
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

exports.getPost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const post = await findPost(req, postId);
		res.status(200).json(post);
	} catch (error) {
		next(error);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const imageUrl = req.file ? req.file.location : null;
		const { title, content } = req.body;
		await createPost(req, title, content, imageUrl);
		res.status(201).send("post created");
	} catch (error) {
		next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	try {
		const imageUrl = req.file ? req.file.location : null;
		const { postId } = req.params;
		const { title, content } = req.body;
		await updatePost(req, postId, title, content, imageUrl);
		res.status(200).send("post updated");
	} catch (error) {
		next(error);
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		await deletePost(req, postId);
		res.status(200).send("post deleted");
	} catch (error) {
		next(error);
	}
};

exports.likePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		liked = await likePost(req, postId);
		res.status(200).send("post liked: " + liked);
	} catch (error) {
		next(error);
	}
};

exports.createComment = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const { content } = req.body;
		await createComment(req, postId, content);
		res.status(201).send("comment created");
	} catch (error) {
		next(error);
	}
};

exports.updateComment = async (req, res, next) => {
	try {
		const { postId, commentId } = req.params;
		const { content } = req.body;
		await updateComment(req, postId, commentId, content);
		res.status(200).send("comment updated");
	} catch (error) {
		next(error);
	}
};

exports.deleteComment = async (req, res, next) => {
	try {
		const { postId, commentId } = req.params;
		await deleteComment(req, postId, commentId);
		res.status(200).send("comment deleted");
	} catch (error) {
		next(error);
	}
};

exports.likeComment = async (req, res, next) => {
	try {
		const { postId, commentId } = req.params;
		liked = await likeComment(req, postId, commentId);
		res.status(200).send("comment liked: " + liked);
	} catch (error) {
		next(error);
	}
};
