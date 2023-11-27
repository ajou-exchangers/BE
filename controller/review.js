const Review = require("../models/review");
const WriteReviewRequest = require("../dto/review/WriteReivewRequest");
const UpdateReviewRequest = require("../dto/review/UpdateReviewRequest");
const ReviewService = require("../services/reviewService");
const RESPONSE_MESSAGE = require("../constants/responseMessage");
const Response = require("../dto/response/Response");

exports.writeReview = async (req,res,next) => {
    try {
        const reviewRequest = new WriteReviewRequest(req.body);
        await ReviewService.writeReview(reviewRequest,req.params.locationId, "655e0b2fd0493f6fccbd3a6c");
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
        const review = await Review.findByIdAndUpdate(req.params.id,updateReviewRequest);
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
        const reviews = await Review.find().populate('keywords');
        res.json(reviews);
    }catch (err){
        next(err);
    }
}

exports.getReviewsByLocation = async (req,res,next) => {
    try {
        const reviews = await Review.find({location:req.params.locationId}).populate('keywords');
        res.json(reviews);
    }catch (err){
        next(err);
    }
}

exports.deleteReview = async (req,res,next) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review){
            const error = new Error("not found review");
            error.status = 404;
            return next(error);
        }
        await Review.deleteOne(review);
        res.json({result:"delete review"});
    }catch (err){
        next(err);
    }
}