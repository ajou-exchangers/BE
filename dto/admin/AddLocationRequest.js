const { divideHangul, normalize} = require("hangul-util");

class AddLocationRequest {
    constructor({
                    koName,
                    koAddress,
                    kioskAvailable,
                    parkingAvailable,
                    englishSpeaking,
                    restroomAvailable,
                    description,
                    category,
                    image,
                    latitude,
                    longitude
                }) {
        this.koName = koName;
        this.enName = normalize(this.koName,false);
        this.koAddress = koAddress;
        this.enAddress = normalize(this.koAddress,false);
        this.kioskAvailable = kioskAvailable;
        this.parkingAvailable = parkingAvailable;
        this.englishSpeaking = englishSpeaking;
        this.restroomAvailable = restroomAvailable;
        this.description = description;
        this.category = category;
        this.image = image;
        this.latitude = latitude;
        this.longitude = longitude;
        this.isVisible = true;
    }
}

module.exports = AddLocationRequest;