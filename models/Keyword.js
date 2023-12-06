const mongoose = require('mongoose');

const validCategories = ['Restaurant', 'Cafe', 'Pharmacy', 'Bank', 'Convenience store'];

const keywordSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: {
            values: validCategories,
            message: props => `${props.value} is not a valid category. Please choose from ${validCategories.join(', ')}.`,
        },
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
});

const Keyword = mongoose.model('Keyword', keywordSchema);

module.exports = Keyword;