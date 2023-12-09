const Location = require("../models/Location");
const UpdateLocation = require("../models/UpdateLocation");
const UpdateLocationDto = require('../dto/admin/UpdateLocationDto')
const {findUser} = require("./userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const LocationUtil = require("../utils/LocationUtil");

exports.adminLogin = async ({email, password}) => {
    const user = await findUser(email, password);
    if (user) {
        if (user.role !== 'admin') {
            throw CustomError(
                ERROR_CODES.UNAUTHORIZED,
                ERROR_MESSAGE.ADMIN_LOGIN_FAIL
            );
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
        .find({isVisible: false}).sort({createdAt: -1})
        .skip(skipItems)
        .limit(10);

    return notAcceptedLocations;
};

exports.getNotAcceptedLocation = async (locationId) => {
    const notAcceptedLocation = await Location.findOne({isVisible: false, _id: locationId})
        .populate({
            path: 'user',
            select: 'email nickname profile',
        });
    if (!notAcceptedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    return notAcceptedLocation;
};

exports.acceptAddLocation = async (locationId) => {
    const noneAcceptLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!noneAcceptLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    const location = await Location.findOne({
        koName: {$regex: LocationUtil.buildEqualLocationRegex(noneAcceptLocation.koName)},
        latitude: noneAcceptLocation.latitude,
        longitude: noneAcceptLocation.longitude,
        isVisible: true,
    });
    if (location) {
        throw CustomError(ERROR_CODES.CONFLICT, ERROR_MESSAGE.LOCATION_ADD_CONFLICT);
    }
    noneAcceptLocation.isVisible = true;
    await noneAcceptLocation.save();
}

exports.rejectAddLocation = async (locationId) => {
    const rejectedLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!rejectedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    await Location.deleteOne(rejectedLocation);
}

exports.deleteLocation = async (locationId) => {
    const deletedLocation = await Location.findOne({isVisible: true, _id: locationId});
    if (!deletedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    await Location.deleteOne(deletedLocation);
}

exports.getUpdateLocations = async (page) => {
    const skipItems = (page - 1) * 10;

    const updateLocations = await UpdateLocation
        .find().populate('location').sort({createdAt: -1})
        .skip(skipItems)
        .limit(10);

    return updateLocations;
}

exports.updateLocation = async (locationUpdateId) => {
    const locationUpdate = await UpdateLocation.findById(locationUpdateId);
    if (!locationUpdate) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_UPDATE_NOT_FOUND);
    }
    const updateLocationDto = new UpdateLocationDto(locationUpdate);
    const location = await Location.findById(locationUpdate.location);
    if (!location) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    Object.assign(location, {...updateLocationDto});

    await location.save();
    await UpdateLocation.deleteOne(locationUpdate);
}

exports.rejectLocationUpdate = async (locationUpdateId) => {
    const locationUpdate = await UpdateLocation.findById(locationUpdateId);
    if (!locationUpdate) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_UPDATE_NOT_FOUND);
    }
    await UpdateLocation.deleteOne(locationUpdate);
}

exports.getUpdateLocation = async (locationUpdateId) => {
    const updateLocation = await UpdateLocation
        .findOne({_id: locationUpdateId}).populate({
            path: 'user',
            select: 'email nickname profile',
        }).populate('location');

    return updateLocation;
}