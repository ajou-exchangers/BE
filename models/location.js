const mongoose = require('mongoose');

const validCategories = ['hospital', 'restaurant', 'cafe'];

const locationSchema = new mongoose.Schema({
    koName: { type: String, required: true },
    enName: { type: String },
    koAddress: { type: String, required: true },
    enAddress: { type: String },
    kioskAvailable: { type: Boolean, required: true },
    parkingAvailable: { type: Boolean, required: true },
    englishSpeaking: { type: Boolean, required: true },
    wifiAvailable: { type: Boolean, required: true },
    description: { type: String },
    category: {
        type: String,
        validate: {
            validator: function (value) {
                return validCategories.includes(value.toLowerCase());
            },
            message: props => `${props.value} is not a valid category. Please choose from ${validCategories.join(', ')}.`,
        },
        required: true,
    },
    image: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    isVisible: { type: Boolean, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;