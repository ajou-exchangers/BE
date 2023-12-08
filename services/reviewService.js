const Location = require("../models/Location");
const Review = require("../models/Review");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const ReviewController = require("../models/Review");

exports.writeReview = async (writeReviewRequest, locationId, userId) => {
    try {
        const location = await Location.findById(locationId);
        if (!location || !location.isVisible) {
            throw CustomError(
                ERROR_CODES.NOT_FOUND,
                ERROR_MESSAGE.LOCATION_NOT_FOUND
            );
        }

        const review = await Review.create({
            location: locationId,
            user: userId,
            ...writeReviewRequest,
        });
        await review.save();

        location.reviewTotalGrade += review.rating;
        location.reviewCount += 1;
        if (location.reviewCount !== 0) {
            location.reviewAverage = (location.reviewTotalGrade / location.reviewCount).toFixed(1);
        }
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
        throw CustomError(e.status, e.message);
    }
};

exports.getReviews = async () => {
    const reviews = await Review.find()
        .populate("keywords")
        .populate({
            path: 'user',
            select: 'email nickname profile',
        }).sort({createdAt: -1})
    return reviews;
};

exports.getReviewsByLocation = async (locationId) => {
    const location = await Location.findById(locationId);
    if (!location || !location.isVisible) {
        throw CustomError(
            ERROR_CODES.NOT_FOUND,
            ERROR_MESSAGE.LOCATION_NOT_FOUND
        );
    }
    const reviews = await Review.find({location: locationId})
        .populate("keywords")
        .populate({
            path: 'user',
            select: 'email nickname profile',
        })
        .sort({createdAt: -1});
    return reviews;
};

exports.updateReview = async (updateReviewRequest, reviewId, userId) => {
    try {
        const review = await Review.findById(reviewId);
        if (!review) {
            throw CustomError(
                ERROR_CODES.NOT_FOUND,
                ERROR_MESSAGE.USER_REVIEW_NOT_FOUND
            );
        }
        if (review.user.toString() !== userId) {
            throw CustomError(
                ERROR_CODES.FORBIDDEN,
                ERROR_MESSAGE.FORBIDDEN_MESSAGE
            );
            return;
        }
        const location = await Location.findById(review.location);
        const reviewRating = review.rating;
        Object.assign(review, {...updateReviewRequest});
        await review.save();

        if (location) {
            location.reviewTotalGrade -= reviewRating;
            location.reviewTotalGrade += review.rating;
            if (location.reviewCount !== 0) {
                location.reviewAverage = (location.reviewTotalGrade / location.reviewCount).toFixed(1);
            }
            await location.save();
        }

    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
        throw CustomError(e.status, e.message);
    }
};

exports.deleteReview = async (reviewId, userId) => {
    const review = await Review.findById(reviewId);
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
    const location = await Location.findById(review.location);
    const reviewRating = review.rating;
    await ReviewController.deleteOne(review);
    if (location) {
        location.reviewTotalGrade -= reviewRating;
        location.reviewCount -= 1;
        location.reviewAverage = (location.reviewTotalGrade / location.reviewCount).toFixed(1);
        await location.save();
    }
};
