const Location = require("../models/Location");
const AddLocationRequest = require("../dto/admin/AddLocationRequest");
const UpdateLocationRequest = require("../dto/admin/UpdateLocationRequest")

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

exports.getNotAcceptedLocations= async (req, res, next) => {
    try {
        const notAcceptedLocations = await Location.find({isVisible:false});
        res.json(notAcceptedLocations);
    } catch (err) {
        next(err);
    }
}