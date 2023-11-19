const Location = require("../models/location");
const AddLocationRequest = require("../dto/admin/AddLocationRequest");
const UpdateLocationRequest = require("../dto/admin/UpdateLocationRequest")

exports.createLocation = async (req, res, next) => {
    try {
        const location = new AddLocationRequest(req.body);
        const locationDoc = await Location.create(location);
        await locationDoc.save();
        res.json(location);
    } catch (err) {
        next(err);
    }
}

exports.updateLocation = async (req, res, next) => {
    try {
        const updateRequest = new UpdateLocationRequest(req.body);
        const updatedLocation = await Location.findByIdAndUpdate(req.params.id,updateRequest);
        if(!updatedLocation){
            const error = new Error("not found location");
            error.status = 404;
            return next(error)
        }
        res.json({result:"update location"});
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