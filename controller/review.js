const Review = require("../models/review");
const Location = require("../models/Location");
const WriteReviewRequest = require("../dto/review/WriteReivewRequest");
const UpdateReviewRequest = require("../dto/review/UpdateReviewRequest");

exports.writeReview = async (req,res,next) => {
    try {
        const location = await Location.findById(req.params.locationId);
        if(!location){
            const error = new Error("not found location");
            error.status = 404;
            return next(error);
        }
        const review = new WriteReviewRequest(req.body);
        const reviewDoc = await Review.create(
            {
                location: location.id,
                ...review
            }
        );
        await reviewDoc.save();
        res.json({message: 'Review created successfully'});
    }catch (err){
        next(err);
    }
}

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