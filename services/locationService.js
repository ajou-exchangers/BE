const Location = require("../models/Location");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const axios = require('axios');
const Review = require("../models/Review");
const calculateAverageRating = require('../utils/ReviewAverage');
const LocationReadResponse = require('../dto/location/LocationReadResponse');

exports.readLocations = async (searchParam, categoryParam) => {
    const baseQuery = categoryParam ? {category: categoryParam} : {};

    if (searchParam) {
        const searchTermWithoutSpaces = searchParam.replace(/\s/g, '');
        const searchRegexString = searchTermWithoutSpaces.split('').join('.*');
        const searchRegex = new RegExp(searchRegexString, 'i');
        // console.log(searchRegex);
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
        return;
    }
    const reviews = await Review.find({location: locationId}).populate('keywords').sort({createdAt: -1});
    const reviewAverage = calculateAverageRating(reviews);
    const reviewCount = reviews.length;
    const locationResponse = new LocationReadResponse({location, reviews, reviewAverage, reviewCount});
    return locationResponse;
}

exports.applyLocation = async (applyLocationRequest, userId, image) => {
    try {
        const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';
        const response = await axios.post(apiUrl,{
            text:applyLocationRequest.koName,
            source:"ko",
            target:"en",
        },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
            },
        })
        const location = await Location.create({...applyLocationRequest, user: userId, image, enName:response.data.message.result.translatedText});
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}