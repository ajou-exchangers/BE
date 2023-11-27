const {
	findPost,
	findPosts,
	createPost,
	updatePost,
	deletePost,
} = require("../services/boardService");

exports.getBoard = async (req, res, next) => {
	try {
		const posts = await findPosts();
		res.status(200).json(posts);
	} catch (error) {
		next(error);
	}
};

exports.getPost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const post = await findPost(postId);
		res.status(200).json(post);
	} catch (error) {
		next(error);
	}
};

exports.createPost = async (req, res, next) => {
	try {
		const { title, content } = req.body;
		const post = await createPost(title, content);
		res.status(201).json(post);
	} catch (error) {
		next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		const { title, content } = req.body;
		await updatePost(postId, title, content);
		res.status(200).send("post updated");
	} catch (error) {
		next(error);
	}
};

exports.deletePost = async (req, res, next) => {
	try {
		const { postId } = req.params;
		await deletePost(postId);
		res.status(200).send("post deleted");
	} catch (error) {
		next(error);
	}
};
