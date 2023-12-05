
const LocationApplyRequest = require("../dto/LocationApplyRequest")
const LocationUpdateRequest = require("../dto/location/LocationUpdateRequest")
const LocationService = require("../services/locationService");
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.readLocations = async (req, res, next) => {
	try {
		const searchParam = req.query.search;
		const categoryParam = req.query.category;

		const locations = await LocationService.readLocations(
			searchParam,
			categoryParam
		);
		res.json(locations);
	} catch (err) {
		next(err);
	}
};

exports.readLocation = async (req, res, next) => {
	try {
		const location = await LocationService.readLocation(req.params.id);
		res.json(location);
	} catch (err) {
		next(err);
	}
};

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

exports.updateLocation = async (req, res, next) => {
    try {
        const image = req.file ? req.file.location : req.body.image;
        const locationId = req.params.id;
        const locationUpdateRequest = new LocationUpdateRequest({...req.body,image});
        await LocationService.updateLocation(locationUpdateRequest, req.session.userId, locationId);
        res.status(200).json(new Response(RESPONSE_MESSAGE.UPDATE_LOCATION));
    } catch (err) {
        next(err);
    }
}
