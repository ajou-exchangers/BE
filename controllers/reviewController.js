const ReviewService = require("../services/reviewService");
const ReviewRequest = require("../dto/review/ReviewRequest");
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.writeReview = async (req, res, next) => {
    try {
        const images = req.files.map((file) => file.location);
        const writeReviewRequest = new ReviewRequest({...req.body, images});
        await ReviewService.writeReview(writeReviewRequest, req.params.locationId, req.session.userId);
        res.status(201).json(new Response(RESPONSE_MESSAGE.WRITE_REVIEW));
    } catch (err) {
        if (err.name === "ValidationError") {
            next(CustomError(ERROR_CODES.BAD_REQUEST, err.message));
        }
        next(err);
    }
}

exports.updateReview = async (req, res, next) => {
    try {
        const images = req.files?.map((file) => file.location).length > 0 ? req.files?.map((file) => file.location) : req.body.images;
        const updateReviewRequest = new ReviewRequest({...req.body, images});
        await ReviewService.updateReview(updateReviewRequest, req.params.id, req.session.userId)
        res.status(200).json(new Response(RESPONSE_MESSAGE.UPDATE_REVIEW));
    } catch (err) {
        if (err.name === "ValidationError") {
            next(CustomError(ERROR_CODES.BAD_REQUEST, err.message));
        }
        next(err);
    }
}

exports.getReviews = async (req, res, next) => {
    try {
        const reviews = await ReviewService.getReviews();
        res.json(reviews);
    } catch (err) {
        next(err);
    }
}

exports.getReviewsByLocation = async (req, res, next) => {
    try {
        const reviews = await ReviewService.getReviewsByLocation(req.params.locationId);
        res.json(reviews);
    } catch (err) {
        next(err);
    }
}

exports.deleteReview = async (req, res, next) => {
    try {
        await ReviewService.deleteReview(req.params.id, req.session.userId);
        res.json(new Response(RESPONSE_MESSAGE.DELETE_REVIEW));
    } catch (err) {
        next(err);
    }
}