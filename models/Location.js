const mongoose = require('mongoose');

const validCategories = ['Restaurant', 'Cafe', 'Pharmacy', 'Bank', 'Convenience store'];
const onlyWhiteSpaceRegex = /^\s+$/;

const locationSchema = new mongoose.Schema({
    koName: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value !== '' && value !== null && !onlyWhiteSpaceRegex.test(value);
            },
            message: props => 'koName must not be empty or null.',
        },
    },
    enName: {type: String},
    koAddress: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value !== '' && value !== null && !onlyWhiteSpaceRegex.test(value);
            },
            message: props => 'koAddress must not be empty or null.',
        },
    },
    enAddress: {type: String},
    kioskAvailable: {type: Boolean, required: true},
    parkingAvailable: {type: Boolean, required: true},
    englishSpeaking: {type: Boolean, required: true},
    wifiAvailable: {type: Boolean, required: true},
    description: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value !== '' && value !== null && !onlyWhiteSpaceRegex.test(value);
            },
            message: props => 'description must not be empty or null.',
        },
    },
    category: {
        type: String,
        enum: {
            values: validCategories,
            message: props => `${props.value} is not a valid category. Please choose from ${validCategories.join(', ')}.`,
        },
        required: true,
    },
    image: {type: String},
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    isVisible: {type: Boolean, required: true},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;