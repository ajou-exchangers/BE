class UpdateLocationDto {
    constructor(locationUpdate) {
        this.koName = locationUpdate.koName;
        this.enName = locationUpdate.enName;
        this.koAddress = locationUpdate.koAddress;
        this.enAddress = locationUpdate.enAddress;
        this.kioskAvailable = locationUpdate.kioskAvailable;
        this.parkingAvailable = locationUpdate.parkingAvailable;
        this.englishSpeaking = locationUpdate.englishSpeaking;
        this.wifiAvailable = locationUpdate.wifiAvailable;
        this.description = locationUpdate.description;
        this.category = locationUpdate.category;
        this.image = locationUpdate.image;
        this.latitude = locationUpdate.latitude;
        this.longitude = locationUpdate.longitude;
        this.user = locationUpdate.user;
        this.createdAt = locationUpdate.createdAt;
    }
}

module.exports = UpdateLocationDto;