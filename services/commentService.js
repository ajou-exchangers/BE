const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CustomError = require("../utils/CustomError");

exports.createComment = async (req, postId, content) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);

	const comment = new Comment({
		content,
		author: req.session.userId,
		post: postId,
	});
	post.comments.push((await comment.save())._id);
	await post.save();
};

exports.updateComment = async (req, postId, commentId, content) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);

	const comment = await Comment.findById(commentId);
	if (!comment)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			ERROR_MESSAGE.COMMENT_NOT_FOUND
		);
	if (comment.author != req.session.userId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.NOT_THE_AUTHOR
		);

	if (comment.post != postId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.COMMENT_NOT_IN_THE_POST
		);

	comment.content = content;
	comment.updatedAt = Date.now();
	await comment.save();
};

exports.deleteComment = async (req, postId, commentId) => {
	const post = await Post.findById(postId);
	if (!post)
		throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.POST_NOT_FOUND);

	const comment = await Comment.findById(commentId);
	if (!comment)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			ERROR_MESSAGE.COMMENT_NOT_FOUND
		);
	if (comment.author != req.session.userId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.NOT_THE_AUTHOR
		);

	if (comment.post != postId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.COMMENT_NOT_IN_THE_POST
		);

	await comment.deleteOne();
	post.comments.pull(commentId);
	await post.save();
};

exports.likeComment = async (req, postId, commentId) => {
	const comment = await Comment.findById(commentId);
	if (!comment)
		throw CustomError(
			ERROR_CODES.NOT_FOUND,
			ERROR_MESSAGE.COMMENT_NOT_FOUND
		);
	if (comment.post != postId)
		throw CustomError(
			ERROR_CODES.BAD_REQUEST,
			ERROR_MESSAGE.COMMENT_NOT_IN_THE_POST
		);

	const liked = comment.likes.includes(req.session.userId);
	if (liked) comment.likes.pull(req.session.userId);
	else comment.likes.push(req.session.userId);

	await comment.save();
	return !liked;
};
