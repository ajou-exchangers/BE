const {findUser} = require("./userService");
const CustomError = require("../utils/CustomError");
const ERROR_CODES = require("../constants/errorCodes");
const ERROR_MESSAGE = require("../constants/errorMessage");

exports.adminLogin = async ({email, password}) => {
    const user = await findUser(email, password);
    if (user) {
        if (user.role !== 'admin') {
            throw CustomError(
                ERROR_CODES.UNAUTHORIZED,
                ERROR_MESSAGE.ADMIN_LOGIN_FAIL
            );
            return;
        }
        return user;
    } else {
        throw CustomError(
            ERROR_CODES.UNAUTHORIZED,
            "Invalid username or password"
        );
    }
}