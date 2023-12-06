const Post = require("../models/Post");
const CustomError = require("../utils/CustomError");

exports.findPosts = async () => {
	const posts = await Post.find().populate("author", "nickname");
	return posts.map((post) => ({
		...post._doc,
		comments: post.comments.length,
		likes: post.likes.length,
	}));
};

exports.findPost = async (postId) => {
	const post = await Post.findById(postId)
		.populate("author", "nickname")
		.populate({
			path: "comments",
			populate: { path: "author", select: "nickname" },
			select: "content createdAt likes",
		});
	return {
		...post._doc,
		comments: post.comments.map((comment) => ({
			...comment._doc,
			likes: comment.likes.length,
		})),
		likes: post.likes.length,
	};
};

exports.createPost = async (req, title, content, imageUrl) => {
	const post = new Post({
		title,
		content,
		imageUrl,
		author: req.session.userId,
	});
	await post.save();
};

exports.updatePost = async (req, postId, title, content) => {
	const post = await Post.findById(postId);
	if (!post) throw CustomError(ERROR_CODES.NOT_FOUND, "Post not found");
	if (post.author != req.session.userId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Not the author");
	post.title = title;
	post.content = content;
	await post.save();
};

exports.deletePost = async (req, postId) => {
	const post = await Post.findById(postId);
	if (!post) throw CustomError(ERROR_CODES.NOT_FOUND, "Post not found");
	if (post.author != req.session.userId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Not authorized");
	await post.deleteOne();
};
