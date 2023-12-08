class PostDetailResponse {
	constructor(post, userId) {
		this._id = post._id;
		this.title = post.title;
		this.content = post.content;
		this.author = post.author;
		this.imageUrl = post.imageUrl;
		this.createdAt = post.createdAt;
		this.updatedAt = post.updatedAt;
		this.comments = post.comments.map((comment) => ({
			...comment._doc,
			likes: comment.likes.length,
			liked: comment.likes.includes(userId),
		}));
		this.likes = post.likes.length;
		this.liked = post.likes.includes(userId);
	}
}

module.exports = PostDetailResponse;
