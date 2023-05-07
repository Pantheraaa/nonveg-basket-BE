const ApiError = require("../middlewares/apiError");

class UserValidation{
    async insert(data) {
        const dataLenghth = Object.keys(data).length;
        if (!dataLenghth) throw ApiError.badRequest("Data is required to create new user");
        
        if (!data.mobile || !data.email) throw ApiError.badRequest("Email or mobile is required");

        if (!data.password) throw ApiError.badRequest("Password is required");
        
        return true;
    }
};

module.exports = new UserValidation();