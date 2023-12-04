class WriteReviewRequest {
    constructor({rating, keywords, review}) {
        this.rating = rating;
        this.keywords = keywords;
        this.review = review;
    }
}

module.exports = WriteReviewRequest;