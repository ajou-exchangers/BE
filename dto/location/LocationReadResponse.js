class LocationReadResponse {
    constructor({
                    location,
                    reviews,
                    reviewCount,
                    reviewAverage
                }) {
        this.location = location;
        this.reviews = reviews;
        this.reviewCount = reviewCount;
        this.reviewAverage = reviewAverage;
    }
}

module.exports = LocationReadResponse;