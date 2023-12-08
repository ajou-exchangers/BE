const Location = require("../models/Location");
const UpdateLocation = require('../models/UpdateLocation');
const Review = require("../models/Review");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const LocationUtil = require("../utils/LocationUtil");
const LocationResponse = require('../dto/location/LocationResponse');

exports.readLocations = async (searchParam, categoryParam) => {
    const baseQuery = categoryParam ? {category: categoryParam} : {};
    baseQuery.isVisible = true;
    if (searchParam) {
        const searchRegex = LocationUtil.buildSearchRegex(searchParam);
        baseQuery.$or = [
            {koName: {$regex: searchRegex}},
            {enName: {$regex: searchRegex}},
        ];
    }
    const locations = await Location.find(baseQuery).sort({createdAt: -1});
    return locations;
}

exports.readLocation = async (locationId) => {
    const location = await Location.findById(locationId);
    if (!location||!location.isVisible) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    const reviews = await Review.find({location: locationId})
        .populate('keywords')
        .populate({
            path: 'user',
            select: 'email nickname profile',
        }).sort({createdAt: -1});
    return new LocationResponse({location, reviews});
    ;
}

exports.applyLocation = async (applyLocationRequest, userId, image) => {
    try {
        const enName = await LocationUtil.translateText(applyLocationRequest.koName, 'ko', 'en');
        const enAddress = await LocationUtil.translateText(applyLocationRequest.koAddress, 'ko', 'en');
        const location = await Location.create({...applyLocationRequest, user: userId, image, enName, enAddress});
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        } else {
            throw CustomError(e.status, e.message);
        }
    }
}

exports.updateLocation = async (locationUpdateRequest, userId, locationId) => {
    const location = await Location.findById(locationId);
    if (!location||!location.isVisible) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
    }
    try {
        const enName = await LocationUtil.translateText(locationUpdateRequest.koName, 'ko', 'en');
        const enAddress = await LocationUtil.translateText(locationUpdateRequest.koAddress, 'ko', 'en');
        const locationUpdate = await UpdateLocation.create({
            ...locationUpdateRequest,
            user: userId,
            enName,
            enAddress,
            location: location._id
        });
        await locationUpdate.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        } else {
            throw CustomError(e.status, e.message);
        }
    }
}