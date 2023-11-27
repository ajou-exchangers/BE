const mongoose = require('mongoose');

const onlyWhiteSpaceRegex = /^\s+$/;

const reviewSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        validate:{
            validator: function (value){
                return value !== null && value >=1 && value <=5;
            },
            message: props => 'rating must not be empty or null. ( rating value : 1 ~ 5 )'
        }
    },
    keywords: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Keyword',
        validate: {
            validator: function (value) {
                return value.length <= 5;
            },
            message: 'Maximum of 5 keywords allowed.',
        },
    },
    review: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value !== '' && value !== null && !onlyWhiteSpaceRegex.test(value);
            },
            message: props => 'review must not be empty or null.',
        },
    },
    photos: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length <= 3;
            },
            message: 'Maximum of 3 photos allowed.',
        },
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;