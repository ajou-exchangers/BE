class LocationUpdateRequest {
    constructor({
                    koName,
                    koAddress,
                    kioskAvailable,
                    parkingAvailable,
                    englishSpeaking,
                    wifiAvailable,
                    description,
                    category,
                    latitude,
                    longitude,
                    image,
                    reason,
                }) {
        this.koName = koName;
        this.koAddress = koAddress;
        this.kioskAvailable = kioskAvailable;
        this.parkingAvailable = parkingAvailable;
        this.englishSpeaking = englishSpeaking;
        this.wifiAvailable = wifiAvailable;
        this.description = description;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
        this.reason = reason;
    }
}

module.exports = LocationUpdateRequest;