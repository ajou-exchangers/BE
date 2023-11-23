const LocationApplyRequest = require("../dto/LocationApplyRequest")
const LocationService = require("../services/locationService");
const Location = require("../models/location");
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.readLocations = async (req, res, next) => {
    try {
        const locations = await LocationService.readLocations();
        res.json(locations);
    } catch (err) {
        next(err);
    }
}

exports.readLocation = async (req, res, next) => {
    try {
        const location = await LocationService.readLocation(req.params.id);
        res.json(location);
    } catch (err) {
        next(err);
    }
}

exports.applyLocation = async (req, res, next) => {
    try {
        const locationApplyRequest = new LocationApplyRequest(req.body);
        await LocationService.applyLocation(locationApplyRequest, req.session.userId);
        res.status(201).json(new Response(RESPONSE_MESSAGE.APPLY_LOCATION));
    } catch (err) {
        next(err);
    }
}