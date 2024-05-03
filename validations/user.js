const ApiError = require("../middlewares/apiError");

class UserValidation{
    async insert(data) {
        const dataLenghth = Object.keys(data).length;
        if (!dataLenghth) throw ApiError.badRequest("Data is required to create new user");
        
        if (!data.name) throw ApiError.badRequest("Name is required");
        if (!data.mobile) throw ApiError.badRequest("Mobile is required");
        if (!data.email) throw ApiError.badRequest("Email is required");
        if (!data.password) throw ApiError.badRequest("Password is required");
        
        return true;
    }
};

module.exports = new UserValidation();