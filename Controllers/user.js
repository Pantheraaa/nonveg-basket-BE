const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const UserService = require("../Services/user");

const newUser = async (req, res) => {
    const data = req.body;
    try {
        const result = await UserService.create(data);

        return Response.success(res, "User created successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err)

        return Response.error(res, ApiError.internal(err));
    }
};

const users = async (req, res) => {
    try {
        const result = await UserService.findAll();

        return Response.success(res, "Users found successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err)

        return Response.error(res, ApiError.internal(err));
    }
};

const login = async (req, res) => {
    const { mobile } = req.body;
    try {
        const result = await UserService.loginUser(mobile);

        return Response.success(res, "User logged in successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err)

        return Response.error(res, ApiError.internal(err));        
    }
}

module.exports = {
    newUser,
    users,
    login
}