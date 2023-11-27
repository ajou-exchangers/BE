const KeywordService = require("../services/keywordService")
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.createKeyword = async (req, res, next) => {
    try {
        await KeywordService.createKeyword(req.body);
        res.status(201).json(new Response(new Response(RESPONSE_MESSAGE.WRITE_REVIEW)));
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