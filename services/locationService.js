const Location = require("../models/location");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");

exports.readLocations = async () => {
    const latestLocations = await Location.find().sort({createdAt: -1});
    return latestLocations;
}

exports.readLocation = async (locationId) => {
    const location = await Location.findById(locationId);
    if (!location) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    return location;
}

exports.applyLocation = async (applyLocationRequest, userId) => {
    try {
        const location = await Location.create({...applyLocationRequest, user: userId});
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}