const Location = require("../models/location");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.applyLocation = async (applyLocationRequest, userId) => {
    const location = await Location.create({...applyLocationRequest, user: userId});
    await location.save();
}