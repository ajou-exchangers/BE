const Keyword = require("../models/Keyword");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.createKeyword = async ({category, keyword}) => {
    try {
        const keywordDoc = await Keyword.create({category, keyword});
        await keywordDoc.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}

exports.getKeywordByCategory = async (category) => {
    const keywords = await Keyword.find({category: category});
    return keywords;
}