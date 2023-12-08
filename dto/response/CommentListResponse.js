class CommentListResponse {
	constructor(comments, userId) {
		this.comments = comments.map((comment) => ({
			...comment._doc,
			likes: comment.likes.length,
			liked: comment.likes.includes(userId),
		}));
	}
}

module.exports = CommentListResponse;
