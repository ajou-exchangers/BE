const {findUser} = require("./userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const Location = require("../models/Location");
const LocationUpdate = require("../models/LocationUpate");

exports.adminLogin = async ({email, password}) => {
    const user = await findUser(email, password);
    if (user) {
        if (user.role !== 'admin') {
            throw CustomError(
                ERROR_CODES.UNAUTHORIZED,
                ERROR_MESSAGE.ADMIN_LOGIN_FAIL
            );
            return;
        }
        return user;
    } else {
        throw CustomError(
            ERROR_CODES.UNAUTHORIZED,
            "Invalid username or password"
        );
    }
}

exports.getNotAcceptedLocations = async (page) => {
    const skipItems = (page - 1) * 10;

    const notAcceptedLocations = await Location
        .find({isVisible: false}).populate('user').sort({createdAt: -1})
        .skip(skipItems)
        .limit(10);

    return notAcceptedLocations;
};

exports.getNotAcceptedLocation = async (locationId) => {
    const notAcceptedLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!notAcceptedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    return notAcceptedLocation;
};

exports.acceptAddLocation = async (locationId) => {
    const acceptLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!acceptLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    acceptLocation.isVisible = true;
    await acceptLocation.save();
}

exports.rejectAddLocation = async (locationId) => {
    const rejectedLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!rejectedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    await Location.deleteOne(rejectedLocation);
}

exports.deleteLocation = async (locationId) => {
    const deletedLocation = await Location.findOne({isVisible: true, _id: locationId});
    if (!deletedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    await Location.deleteOne(deletedLocation);
}

exports.getUpdateLocations = async (page) => {
    const skipItems = (page - 1) * 10;

    const updateLocations = await LocationUpdate
        .find().populate({
            path: 'user',
            select: 'email nickname',
        }).populate('location').sort({createdAt: -1})
        .skip(skipItems)
        .limit(10);

    return updateLocations;
}

exports.updateLocation = async (locationUpdateId) => {
    const locationUpdate = await LocationUpdate.findById(locationUpdateId);
    if (!locationUpdate) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_UPDATE_NOT_FOUND);
        return;
    }
    const location = await Location.findById(locationUpdate.location);
    if (!location) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    location.koName = locationUpdate.koName;
    location.enName = locationUpdate.enName;
    location.koAddress = locationUpdate.koAddress;
    location.enAddress = locationUpdate.enAddress;
    location.kioskAvailable = locationUpdate.kioskAvailable;
    location.parkingAvailable = locationUpdate.parkingAvailable;
    location.englishSpeaking = locationUpdate.englishSpeaking;
    location.wifiAvailable = locationUpdate.wifiAvailable;
    location.description = locationUpdate.description;
    location.category = locationUpdate.category;
    location.image = locationUpdate.image;
    location.latitude = locationUpdate.latitude;
    location.longitude = locationUpdate.longitude;
    location.user = locationUpdate.user;
    location.createdAt = locationUpdate.createdAt;
    await location.save();

    await LocationUpdate.deleteOne(locationUpdate);
}

exports.rejectLocationUpdate = async (locationUpdateId) => {
    const locationUpdate = await LocationUpdate.findById(locationUpdateId);
    if (!locationUpdate) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_UPDATE_NOT_FOUND);
        return;
    }
    await LocationUpdate.deleteOne(locationUpdate);
}

exports.getUpdateLocation = async (locationUpdateId) => {
    const updateLocation = await LocationUpdate
        .findOne({_id:locationUpdateId}).populate({
            path: 'user',
            select: 'email nickname',
        }).populate('location');

    return updateLocation;
}