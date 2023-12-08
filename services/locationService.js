const Location = require("../models/Location");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const axios = require('axios');
const Review = require("../models/Review");
const calculateAverageRating = require('../utils/ReviewAverage');
const LocationReadResponse = require('../dto/location/LocationReadResponse');
const LocationUpdate = require('../models/LocationUpate');

exports.readLocations = async (searchParam, categoryParam) => {
    if(!(searchParam||categoryParam)){
        const locations = await Location.find().sort({createdAt:-1});
        return locations;
    }

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
    const reviews = await Review.find({location: locationId}).populate('keywords').populate('user').sort({createdAt: -1});
    const reviewAverage = calculateAverageRating(reviews);
    const reviewCount = reviews.length;
    const locationResponse = new LocationReadResponse({location, reviews, reviewAverage, reviewCount});
    return locationResponse;
}

exports.applyLocation = async (applyLocationRequest, userId, image) => {
    try {
        const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';
        const enNameResponse = await axios.post(apiUrl, {
            text: applyLocationRequest.koName,
            source: "ko",
            target: "en",
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
            },
        })
        const enName = enNameResponse.data.message.result.translatedText;

        const enAddressResponse = await axios.post(apiUrl, {
            text: applyLocationRequest.koAddress,
            source: "ko",
            target: "en",
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
            },
        })
        const enAddress = enAddressResponse.data.message.result.translatedText;

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
    if (!location) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    try {
        const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';
        const enNameResponse = await axios.post(apiUrl, {
            text: locationUpdateRequest.koName,
            source: "ko",
            target: "en",
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
            },
        })
        const enName = enNameResponse.data.message.result.translatedText;

        const enAddressResponse = await axios.post(apiUrl, {
            text: locationUpdateRequest.koAddress,
            source: "ko",
            target: "en",
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
            },
        })
        const enAddress = enAddressResponse.data.message.result.translatedText;
        const locationUpdate = await LocationUpdate.create({
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