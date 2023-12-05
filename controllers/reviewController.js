const ReviewController = require("../models/Review");
const WriteReviewRequest = require("../dto/review/WriteReivewRequest");
const UpdateReviewRequest = require("../dto/review/UpdateReviewRequest");
const ReviewService = require("../services/reviewService");
const RESPONSE_MESSAGE = require("../constants/responseMessage");
const Response = require("../dto/response/Response");

exports.writeReview = async (req, res, next) => {
    try {
        const images = req.files.map((file) => file.location);
        const reviewRequest = new WriteReviewRequest(req.body);
        await ReviewService.writeReview(reviewRequest, req.params.locationId, req.session.userId, images);
        res.status(201).json(new Response(RESPONSE_MESSAGE.WRITE_REVIEW));
    } catch (err) {
        next(err);
    }
}

exports.updateReview = async (req, res, next) => {
    try {
        const images = req.files?.map((file) => file.location).length > 0 ? req.files?.map((file) => file.location) : req.body.images;
        const updateReviewRequest = new UpdateReviewRequest(req.body);
        await ReviewService.updateReview(updateReviewRequest, req.params.id, images, req.session.userId)
        res.status(200).json(new Response(RESPONSE_MESSAGE.UPDATE_REVIEW));
    } catch (e) {
        next(e);
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
        await ReviewService.deleteReview(req.params.id,req.session.userId);
        res.json(new Response(RESPONSE_MESSAGE.DELETE_REVIEW));
    } catch (err) {
        next(err);
    }
}