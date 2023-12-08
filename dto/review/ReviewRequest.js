class WriteReviewRequest {
    constructor({rating, keywords, review, images}) {
        this.rating = rating;
        this.keywords = keywords;
        this.review = review;
        this.images = images;
    }
}

module.exports = WriteReviewRequest;