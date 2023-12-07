const RESPONSE_MESSAGE = require("../constants/errorMessage");
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

exports.findPost = async (req, postId) => {
	const post = await Post.findById(postId)
		.populate("author", "nickname")
		.populate({
			path: "comments",
			populate: { path: "author", select: "nickname" },
			select: "content createdAt likes",
		});
	if (!post)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			RESPONSE_MESSAGE.POST_NOT_FOUND
		);

	return {
		...post._doc,
		comments: post.comments.map((comment) => ({
			...comment._doc,
			likes: comment.likes.length,
			liked: comment.likes.includes(req.session.userId),
		})),
		likes: post.likes.length,
		liked: post.likes.includes(req.session.userId),
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
	if (!post)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			RESPONSE_MESSAGE.POST_NOT_FOUND
		);
	if (post.author != req.session.userId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.NOT_THE_AUTHOR
		);

	post.title = title;
	post.content = content;
	post.updatedAt = Date.now();
	await post.save();
};

exports.deletePost = async (req, postId) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			RESPONSE_MESSAGE.POST_NOT_FOUND
		);
	if (post.author != req.session.userId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			RESPONSE_MESSAGE.NOT_THE_AUTHOR
		);

	await post.deleteOne();
};

exports.likePost = async (req, postId) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			RESPONSE_MESSAGE.POST_NOT_FOUND
		);

	const liked = post.likes.includes(req.session.userId);
	if (liked) post.likes.pull(req.session.userId);
	else post.likes.push(req.session.userId);

	await post.save();
	return !liked;
};
