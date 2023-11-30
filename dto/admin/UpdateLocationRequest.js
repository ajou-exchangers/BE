const { divideHangul, normalize} = require("hangul-util");

class UpdateLocationRequest {
    constructor({
                    koName,
                    koAddress,
                    kioskAvailable,
                    parkingAvailable,
                    englishSpeaking,
                    restroomAvailable,
                    description,
                    category,
                    image
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
    }
}

module.exports = UpdateLocationRequest;