class WriteReviewRequest {
    constructor({rating, keywords, review, images}) {
        this.rating = rating;
        this.keywords = Array.isArray(keywords) ? keywords : JSON.parse(keywords);
        this.review = review;
        this.images = images;
    };
}

module.exports = WriteReviewRequest;