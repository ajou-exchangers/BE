const ReviewController = require("../models/Review");
const WriteReviewRequest = require("../dto/review/WriteReivewRequest");
const UpdateReviewRequest = require("../dto/review/UpdateReviewRequest");
const ReviewService = require("../services/reviewService");
const RESPONSE_MESSAGE = require("../constants/responseMessage");
const Response = require("../dto/response/Response");

exports.writeReview = async (req,res,next) => {
    try {
        const reviewRequest = new WriteReviewRequest(req.body);
        await ReviewService.writeReview(reviewRequest,req.params.locationId, "65648f6cd79e3deb83b73dc1");
        res.status(201).json(new Response(new Response(RESPONSE_MESSAGE.WRITE_REVIEW)));
    }catch (err){
        next(err);
    }
}

// exports.writeReview = async (req,res,next) => {
//     try {
//         const reviewRequest = new WriteReviewRequest(req.body);
//         await ReviewService.writeReview(reviewRequest,req.params.locationId, req.session.userId);
//         res.status(201).json(new Response(new Response(RESPONSE_MESSAGE.WRITE_REVIEW)));
//     }catch (err){
//         next(err);
//     }
// }

exports.updateReview = async (req,res,next) => {
    try {
        const updateReviewRequest = new UpdateReviewRequest(req.body);
        const review = await ReviewController.findByIdAndUpdate(req.params.id,updateReviewRequest);
        if(!review){
            const error = new Error("not found review");
            error.status = 404;
            return next(error);
        }
        res.json({result:"update review"});
    }catch (err){
        next(err);
    }
}

exports.getReviews = async (req,res,next) => {
    try {
        const reviews = await ReviewService.getReviews();
        res.json(reviews);
    }catch (err){
        next(err);
    }
}

exports.getReviewsByLocation = async (req,res,next) => {
    try {
        const reviews = await ReviewService.getReviewsByLocation(req.params.locationId);
        res.json(reviews);
    }catch (err){
        next(err);
    }
}

exports.deleteReview = async (req,res,next) => {
    try {
        const review = await ReviewController.findById(req.params.id);
        if(!review){
            const error = new Error("not found review");
            error.status = 404;
            return next(error);
        }
        await ReviewController.deleteOne(review);
        res.json({result:"delete review"});
    }catch (err){
        next(err);
    }
}