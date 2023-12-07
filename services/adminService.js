const {findUser} = require("./userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const Location = require("../models/Location");

exports.adminLogin = async ({email, password}) => {
    const user = await findUser(email, password);
    if (user) {
        if (user.role !== 'admin') {
            throw CustomError(
                ERROR_CODES.UNAUTHORIZED,
                ERROR_MESSAGE.ADMIN_LOGIN_FAIL
            );
            return;
        }
        return user;
    } else {
        throw CustomError(
            ERROR_CODES.UNAUTHORIZED,
            "Invalid username or password"
        );
    }
}

exports.getNotAcceptedLocations = async (page) => {
    const skipItems = (page - 1) * 10;

    const notAcceptedLocations = await Location
        .find({isVisible: false}).populate('user').sort({createdAt: -1})
        .skip(skipItems)
        .limit(10);

    return notAcceptedLocations;
};

exports.getNotAcceptedLocation = async (locationId) => {
    const notAcceptedLocation = await Location.findOne({isVisible: false, _id: locationId});
    if(!notAcceptedLocation){
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    return notAcceptedLocation;
};

exports.acceptAddLocation = async (locationId) => {
    const acceptLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!acceptLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    acceptLocation.isVisible = true;
    await acceptLocation.save();
}