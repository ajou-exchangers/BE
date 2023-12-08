class LocationResponse {
    constructor({
                    location,
                    reviews,
                }) {
        this.location = location;
        this.reviews = reviews;
    }
}

module.exports = LocationResponse;