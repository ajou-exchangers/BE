const Location = require("../models/location");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.readLocation = async () => {
    const latestLocations = await Location.find().sort({createdAt: -1});
    return latestLocations;
}
exports.applyLocation = async (applyLocationRequest, userId) => {
    try {
        const location = await Location.create({...applyLocationRequest, user: userId});
        await location.save();
    } catch (e) {
        if (e.name === "ValidationError") {
            throw CustomError(ERROR_CODES.BAD_REQUEST, e.message);
        }
    }
}