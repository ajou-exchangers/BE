const Location = require("../models/Location");
const LoginResponse = require("../dto/response/LoginResponse");
const adminService = require("../services/adminService");

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
        const acceptLocation = await Location.findById(req.params.id);
        if (!acceptLocation) {
            const error = new Error("not found apply location");
            error.status = 404;
            return next(error)
        }
        acceptLocation.isVisible = true;
        await acceptLocation.save();
        res.json(acceptLocation);
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

exports.adminLogin = async (req, res, next) => {
    try {
        const user = await adminService.adminLogin({...req.body});
        req.session.userId = user._id;
        res.status(200).json(new LoginResponse(user));
    } catch (error) {
        next(error);
    }
};