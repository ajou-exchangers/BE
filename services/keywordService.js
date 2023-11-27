const Keyword = require("../models/keyword");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");

exports.getKeywordByCategory = async (category) => {
    const keywords = await Keyword.find({category: category});
    return keywords;
}