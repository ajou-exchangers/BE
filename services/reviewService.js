const Location = require("../models/Location");
const Review = require("../models/Review");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const ReviewController = require("../models/Review");

exports.writeReview = async (reviewRequest, locationId, userId, images) => {
    try {
        const location = await Location.findById(locationId);
        if (!location) {
            throw CustomError(
                ERROR_CODES.NOT_FOUND,
                ERROR_MESSAGE.LOCATION_NOT_FOUND
            );
            return;
        }
        //장소 추가 수락 및 거절 구현하면 추가
        // if (!location.isVisiable){
        //     throw CustomError(ERROR_CODES.FORBIDDEN, ERROR_MESSAGE.FORBIDDEN_MESSAGE);
        // }

        const reviewDoc = await Review.create({
            location: location.id,
            user: userId,
            images: images,
            ...reviewRequest,
        });
        await reviewDoc.save();

        location.reviewTotalGrade += reviewDoc.rating;
        location.reviewCount += 1;
        location.reviewAverage = location.reviewTotalGrade / location.reviewCount.toFixed(1);
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
            return;
        } else {
            throw CustomError(e.status, e.message);
        }
    }
};

exports.getReviews = async () => {
    const reviews = await Review.find()
        .populate("keywords")
        .populate("user")
        .sort({createAt: -1});
    return reviews;
};

exports.getReviewsByLocation = async (locationId) => {
    const location = await Location.findById(locationId);
    if (!location) {
        throw CustomError(
            ERROR_CODES.NOT_FOUND,
            ERROR_MESSAGE.LOCATION_NOT_FOUND
        );
        return;
    }
    const reviews = await Review.find({location: locationId})
        .populate("keywords")
        .populate("user")
        .sort({createdAt: -1});
    return reviews;
};

exports.updateReview = async (
    updateReviewRequest,
    reviewId,
    images,
    userId
) => {
    try {
        const review = await ReviewController.findOneAndUpdate(
            {_id: reviewId, user: userId},
            {
                ...updateReviewRequest,
                images: images,
            }
        );
        if (!review) {
            throw CustomError(
                ERROR_CODES.NOT_FOUND,
                ERROR_MESSAGE.USER_REVIEW_NOT_FOUND
            );
        }
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        } else {
            throw CustomError(e.status, e.message);
        }
    }
};

exports.deleteReview = async (reviewId, userId) => {
    const review = await ReviewController.findOne({_id: reviewId});
    if (!review) {
        throw CustomError(
            ERROR_CODES.NOT_FOUND,
            ERROR_MESSAGE.REVIEW_NOT_FOUND
        );
        return;
    }
    if (review.user.toString() !== userId) {
        throw CustomError(
            ERROR_CODES.FORBIDDEN,
            ERROR_MESSAGE.FORBIDDEN_MESSAGE
        );
        return;
    }
    await ReviewController.deleteOne(review);
};
