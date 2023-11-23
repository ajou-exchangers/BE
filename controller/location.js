const LocationApplyRequest = require("../dto/LocationApplyRequest")
const LocationService = require("../services/locationService");
const Location = require("../models/location");
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.readLocations = async (req, res, next) => {
    try {
        const locations = await Location.find();
        res.json(locations);
    } catch (err) {
        next(err);
    }
}

exports.readLocation = async (req, res, next) => {
    try {
        const location = await Location.findById(req.params.id);
        if (!location) {
            const error = new Error("not found location");
            error.status = 404;
            return next(error)
        }
        res.json(location);
    } catch (err) {
        next(err);
    }
}

exports.applyLocation = async (req, res, next) => {
    try {
        const locationApplyRequest = new LocationApplyRequest(req.body);
        await LocationService.applyLocation(locationApplyRequest, req.session.userId);
        res.json(new Response(RESPONSE_MESSAGE.APPLY_LOCATION));
    } catch (err) {
        next(err);
    }
}