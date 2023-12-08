class LocationApplyRequest {
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
                    longitude
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
        this.isVisible = false;
    }
}

module.exports = LocationApplyRequest;