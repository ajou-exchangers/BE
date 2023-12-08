const ERROR_MESSAGE = require("../constants/errorMessage");
const PostDetailResponse = require("../dto/response/PostDetailResponse");
const PostListResponse = require("../dto/response/PostListResponse");
const Post = require("../models/Post");
const CustomError = require("../utils/CustomError");

exports.findAllPosts = async () => {
	const posts = await Post.find().populate("author", "nickname");
	return new PostListResponse(posts);
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
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);

	return new PostDetailResponse(post, req.session.userId);
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
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);
	if (post.author != req.session.userId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.NOT_THE_AUTHOR
		);

	post.title = title;
	post.content = content;
	post.updatedAt = Date.now();
	await post.save();
};

exports.deletePost = async (req, postId) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);
	if (post.author != req.session.userId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.NOT_THE_AUTHOR
		);

	await post.deleteOne();
};

exports.likePost = async (req, postId) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);

	const liked = post.likes.includes(req.session.userId);
	if (liked) post.likes.pull(req.session.userId);
	else post.likes.push(req.session.userId);

	await post.save();
	return !liked;
};
