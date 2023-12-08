class PostListResponse {
	constructor(posts) {
		this.posts = posts.map((post) => ({
			...post._doc,
			comments: post.comments.length,
			likes: post.likes.length,
		}));
	}
}

module.exports = PostListResponse;
