const axios = require('axios');
const CustomError = require("../utils/CustomError");

exports.buildSearchRegex = (searchParam) => {
    const searchTermWithoutSpaces = searchParam.replace(/\s/g, '');
    const searchRegexString = searchTermWithoutSpaces.split('').join('.*');
    return new RegExp(searchRegexString, 'i');
}

exports.translateText = async (text, source, target) => {
    const apiUrl = 'https://openapi.naver.com/v1/papago/n2mt';

    try {
        const response = await axios.post(apiUrl, {
            text,
            source,
            target,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Naver-Client-Id': process.env.PAPAGO_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.PAPAGO_SECRET,
            },
        });

        return response.data.message.result.translatedText;
    } catch (error) {
        throw CustomError(error.status || 500, error.message || 'Translation failed');
    }
};

exports.buildEqualLocationRegex = (searchParam) => {
    const searchTermWithoutSpaces = searchParam.replace(/\s/g, '');
    const searchRegexString = searchTermWithoutSpaces.split('').map(char => `${char}.*`).join('');
    return new RegExp(`^${searchRegexString}$`, 'i');
}