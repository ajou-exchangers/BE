const User = require("../models/User");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");

exports.checkAdminAuthenticated = async (req, res, next) => {
    if (req.session.userId) {
        const user = await User.findById(req.session.userId);
        if(user && user.role==='admin'){
            next();
        }else{
            next(CustomError(ERROR_CODES.UNAUTHORIZED, "Admin not authenticated"));
        }
    } else {
        next(CustomError(ERROR_CODES.UNAUTHORIZED, "User not authenticated"));
    }
};