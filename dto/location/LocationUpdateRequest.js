const { divideHangul, normalize} = require("hangul-util");

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
                }) {
        this.koName = koName;
        this.koAddress = koAddress;
        this.enAddress = normalize(this.koAddress,false);
        this.kioskAvailable = kioskAvailable;
        this.parkingAvailable = parkingAvailable;
        this.englishSpeaking = englishSpeaking;
        this.wifiAvailable = wifiAvailable;
        this.description = description;
        this.category = category;
        this.latitude = latitude;
        this.longitude = longitude;
        this.image = image;
    }
}

module.exports = LocationUpdateRequest;