const LocationApplyRequest = require("../dto/LocationApplyRequest")
const LocationService = require("../services/locationService");
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.readLocations = async (req, res, next) => {
    try {
        const searchParam = req.query.search;
        const categoryParam = req.query.category;

        const locations = await LocationService.readLocations(searchParam, categoryParam);
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
        const imageUrl = req.file ? req.file.location : null;
        const locationApplyRequest = new LocationApplyRequest(req.body);
        await LocationService.applyLocation(locationApplyRequest, req.session.userId, imageUrl);
        res.status(201).json(new Response(RESPONSE_MESSAGE.APPLY_LOCATION));
    } catch (err) {
        next(err);
    }
}