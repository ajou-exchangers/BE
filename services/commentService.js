const ERROR_CODES = require("../constants/errorCodes");
const Comment = require("../models/Comment");
const Post = require("../models/Post");
const CustomError = require("../utils/CustomError");

exports.createComment = async (req, postId, content) => {
	const post = await Post.findById(postId);
	if (!post) throw CustomError(ERROR_CODES.NOT_FOUND, "Post not found");

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
	if (!post) throw CustomError(ERROR_CODES.NOT_FOUND, "Post not found");

	const comment = await Comment.findById(commentId);
	if (!comment) throw CustomError(ERROR_CODES.NOT_FOUND, "Comment not found");
	if (comment.author != req.session.userId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Not the author");

	if (comment.post != postId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Comment not in the post");

	comment.content = content;
	await comment.save();
};

exports.deleteComment = async (req, postId, commentId) => {
	const post = await Post.findById(postId);
	if (!post) throw CustomError(ERROR_CODES.NOT_FOUND, "Post not found");

	const comment = await Comment.findById(commentId);
	if (!comment) throw CustomError(ERROR_CODES.NOT_FOUND, "Comment not found");
	if (comment.author != req.session.userId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Not the author");

	if (comment.post != postId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Comment not in the post");

	await comment.deleteOne();
	post.comments.pull(commentId);
	await post.save();
};

exports.likeComment = async (req, postId, commentId) => {
	const comment = await Comment.findById(commentId);
	if (!comment) throw CustomError(ERROR_CODES.NOT_FOUND, "Comment not found");
	if (comment.post != postId)
		throw CustomError(ERROR_CODES.BAD_REQUEST, "Comment not in the post");

	const liked = comment.likes.includes(req.session.userId);
	if (liked) comment.likes.pull(req.session.userId);
	else comment.likes.push(req.session.userId);

	await comment.save();
	return !liked;
};
