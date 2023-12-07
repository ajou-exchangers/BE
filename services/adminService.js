const {findUser} = require("./userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");
const Location = require("../models/Location");
const LocationUpdate = require("../models/LocationUpate");

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
    if (!notAcceptedLocation) {
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

exports.rejectAddLocation = async (locationId) => {
    const rejectedLocation = await Location.findOne({isVisible: false, _id: locationId});
    if (!rejectedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    await Location.deleteOne(rejectedLocation);
}

exports.deleteLocation = async (locationId) => {
    const deletedLocation = await Location.findOne({isVisible: true, _id: locationId});
    if (!deletedLocation) {
        throw CustomError(ERROR_CODES.NOT_FOUND, ERROR_MESSAGE.LOCATION_NOT_FOUND);
        return;
    }
    await Location.deleteOne(deletedLocation);
}

exports.getUpdateLocations = async (page) => {
    const skipItems = (page - 1) * 10;

    const updateLocations = await LocationUpdate
        .find().populate({
            path: 'user',
            select: 'email nickname', // Specify the fields you want to populate
        }).populate('location').sort({createdAt: -1})
        .skip(skipItems)
        .limit(10);

    return updateLocations;
}