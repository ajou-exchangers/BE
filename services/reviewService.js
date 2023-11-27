const Location = require("../models/Location");
const Review = require("../models/review");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");

exports.writeReview = async (reviewRequest, locationId, userId) => {
    try {
        const location = await Location.findById(locationId);
        if(!location){
            throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        }

        const reviewDoc = await Review.create(
            {
                location: location.id,
                user: userId,
                ...reviewRequest
            }
        );
        await reviewDoc.save();
    }catch (e){
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}