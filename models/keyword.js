const mongoose = require('mongoose');

const validCategories = ['restaurant', 'cafe', 'hospital', 'pharmacy', 'bank', 'other'];

const keywordSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: validCategories,
        required: true,
    },
    keyword: {
        type: String,
        required: true,
    },
});

const Keyword = mongoose.model('Keyword', keywordSchema);

module.exports = Keyword;