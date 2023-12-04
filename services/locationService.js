const Location = require("../models/Location");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");

exports.readLocations = async (searchParam, categoryParam) => {
    const baseQuery = categoryParam ? {category: categoryParam} : {};

    if (searchParam) {
        const searchTermWithoutSpaces = searchParam.replace(/\s/g, '');
        const searchRegexString = searchTermWithoutSpaces.split('').join('.*');
        const searchRegex = new RegExp(searchRegexString, 'i');
        console.log(searchRegex);
        baseQuery.$or = [
            {koName: {$regex: searchRegex}},
            {enName: {$regex: searchRegex}},
        ];
    }
    const latestLocations = await Location.find(baseQuery).sort({createdAt: -1});
    return latestLocations;
}

exports.readLocation = async (locationId) => {
    const location = await Location.findById(locationId);
    if (!location) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    return location;
}

exports.applyLocation = async (applyLocationRequest, userId, image) => {
    try {
        const location = await Location.create({...applyLocationRequest, user: userId, image});
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}