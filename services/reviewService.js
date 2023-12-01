const Location = require("../models/Location");
const Review = require("../models/Review");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const UpdateReviewRequest = require("../dto/review/UpdateReviewRequest");
const ReviewController = require("../models/Review");

exports.writeReview = async (reviewRequest, locationId, userId, images) => {
    try {
        const location = await Location.findById(locationId);
        if (!location) {
            throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        }

        const reviewDoc = await Review.create(
            {
                location: location.id,
                user: userId,
                images: images,
                ...reviewRequest
            }
        );
        await reviewDoc.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}

// 테스트를 위해 user 조회 제외
// exports.getReviews = async () => {
//     const reviews = await Review.find().populate('keywords').populate('user').sort({createAt:-1});
//     return reviews;
// }

exports.getReviews = async () => {
    const reviews = await Review.find().populate('keywords').sort({createdAt: -1});
    return reviews;
}

//테스트를 위해 user 조회가 없는 service 배포
// exports.getReviewsByLocation = async (locationId) => {
//     const reviews = await Review.find({location: locationId}).populate('keywords').populate('user').sort({createdAt: -1});
//     return reviews;
// }

exports.getReviewsByLocation = async (locationId) => {
    const reviews = await Review.find({location: locationId}).populate('keywords').sort({createdAt: -1});
    return reviews;
}

exports.updateReview = async (updateReviewRequest, id, images) => {
    try {
        const review = await ReviewController.findByIdAndUpdate(id, {...updateReviewRequest, images: images});
        if (!review) {
            throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.REVIEW_NOT_FOUND);
        }
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}