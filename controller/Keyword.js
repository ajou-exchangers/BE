const Keyword = require("../models/keyword");
const KeywordService = require("../services/keywordService")

exports.createKeyword = async (req, res, next) => {
    try {
        const keywordDoc = await Keyword.create(req.body);
        const keyword = await keywordDoc.save();
        res.json(keyword);
    } catch (err) {
        next(err);
    }
}

exports.getKeywordByCategory = async (req, res, next) => {
    try {
        const category = req.params.category;
        const keywords = await KeywordService.getKeywordByCategory(category);
        res.json(keywords);
    } catch (e) {
        next(e);
    }
}