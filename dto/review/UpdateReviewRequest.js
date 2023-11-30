class UpdateReviewRequest {
    constructor({rating, keywords, review, photos}) {
        this.rating = rating;
        this.keywords = keywords;
        this.review = review;
        this.photos = photos;
    }
}

module.exports = UpdateReviewRequest;