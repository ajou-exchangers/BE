const AdminService = require("../services/adminService");
const Response = require("../dto/response/Response");
const UserInfoResponse = require("../dto/response/UserInfoResponse");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.deleteLocation = async (req, res, next) => {
	try {
		await AdminService.deleteLocation(req.params.id);
		res.status(200).json(new Response(RESPONSE_MESSAGE.DELETE_LOCATION));
	} catch (error) {
		next(error);
	}
};

exports.acceptAddLocation = async (req, res, next) => {
	try {
		await AdminService.acceptAddLocation(req.params.id);
		res.status(200).json(new Response(RESPONSE_MESSAGE.ACCEPT_LOCATION));
	} catch (error) {
		next(error);
	}
};

exports.rejectAddLocation = async (req, res, next) => {
	try {
		await AdminService.rejectAddLocation(req.params.id);
		res.status(200).json(new Response(RESPONSE_MESSAGE.REJECT_LOCATION));
	} catch (error) {
		next(error);
	}
};

exports.getNotAcceptedLocations = async (req, res, next) => {
	try {
		const page = req.query.page || 1;
		const notAcceptedLocations = await AdminService.getNotAcceptedLocations(page);
		res.json(notAcceptedLocations);
	} catch (err) {
		next(err);
	}
};

exports.getNotAcceptedLocation = async (req, res, next) => {
	try {
		const locationId = req.params.id;
		const notAcceptedLocation = await AdminService.getNotAcceptedLocation(
			locationId
		);
		res.json(notAcceptedLocation);
	} catch (err) {
		next(err);
	}
};

exports.adminLogin = async (req, res, next) => {
	try {
		const user = await AdminService.adminLogin({ ...req.body });
		req.session.userId = user._id;
		res.status(200).json(new UserInfoResponse(user));
	} catch (error) {
		next(error);
	}
};

exports.getUpdateLocations = async (req, res, next) => {
	try {
		const page = req.query.page || 1;
		const updateLocations = await AdminService.getUpdateLocations(page);
		res.json(updateLocations);
	} catch (error) {
		next(error);
	}
};

exports.updateLocation = async (req, res, next) => {
	try {
		const locationUpdateId = req.params.id;
		await AdminService.updateLocation(locationUpdateId);
		res.status(200).json(
			new Response(RESPONSE_MESSAGE.UPDATE_ACCEPT_LOCATION)
		);
	} catch (error) {
		next(error);
	}
};

exports.rejectLocationUpdate = async (req, res, next) => {
	try {
		const locationUpdateId = req.params.id;
		await AdminService.rejectLocationUpdate(locationUpdateId);
		res.status(200).json(
			new Response(RESPONSE_MESSAGE.UPDATE_REJECT_LOCATION)
		);
	} catch (error) {
		next(error);
	}
};

exports.getUpdateLocation = async (req, res, next) => {
	try {
		const updateLocation = await AdminService.getUpdateLocation(
			req.params.id
		);
		res.json(updateLocation);
	} catch (error) {
		next(error);
	}
};
