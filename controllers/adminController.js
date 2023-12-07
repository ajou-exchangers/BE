const Location = require("../models/Location");
const LoginResponse = require("../dto/response/LoginResponse");
const adminService = require("../services/adminService");
const Response = require("../dto/response/Response");
const RESPONSE_MESSAGE = require("../constants/responseMessage");

exports.deleteLocation = async (req, res, next) => {
    try {
        const deletedLocation = await Location.findById(req.params.id);
        if (!deletedLocation) {
            const error = new Error("not found location");
            error.status = 404;
            return next(error)
        }
        await Location.deleteOne(deletedLocation);
        res.json({result: "delete location"});
    } catch (error) {
        next(error);
    }
}

exports.acceptAddLocation = async (req, res, next) => {
    try {
        await adminService.acceptAddLocation(req.params.id);
        res.status(201).json(new Response(RESPONSE_MESSAGE.ACCEPT_LOCATION));
    } catch (error) {
        next(error);
    }
}

exports.rejectAddLocation = async (req, res, next) => {
    try {
        const rejectedLocation = await Location.findById(req.params.id);
        if (!rejectedLocation) {
            const error = new Error("not found apply location");
            error.status = 404;
            next(error)
        }
        await Location.deleteOne(rejectedLocation);
        res.json({result: "reject add location"});
    } catch (error) {
        next(error);
    }
}


exports.getNotAcceptedLocations = async (req, res, next) => {
    try {
        const page = req.query.page || 1;
        const notAcceptedLocations = await adminService.getNotAcceptedLocations(page);
        res.json(notAcceptedLocations);
    } catch (err) {
        next(err);
    }
}

exports.getNotAcceptedLocation = async (req, res, next) => {
    try {
        const locationId = req.params.id;
        const notAcceptedLocation = await adminService.getNotAcceptedLocation(locationId);
        res.json(notAcceptedLocation);
    } catch (err) {
        next(err);
    }
}

exports.adminLogin = async (req, res, next) => {
    try {
        const user = await adminService.adminLogin({...req.body});
        req.session.userId = user._id;
        res.status(200).json(new LoginResponse(user));
    } catch (error) {
        next(error);
    }
};