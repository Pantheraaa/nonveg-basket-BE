const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const UserService = require("../Services/user");
const JwtUtils = require("../utils/jwt");

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

        return Response.success(res, `${result.length} users found successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err)

        return Response.error(res, ApiError.internal(err));
    }
};

const login = async (req, res) => {
    const data = req.body;
    try {
        const result = await UserService.loginUser(data);

        // Generate token:
        result.dataValues.token = JwtUtils.generateToken(result.dataValues);

        return Response.success(res, "User logged in successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err)

        return Response.error(res, ApiError.internal(err));
    };
};

const authUser = async (req, res) => {
    const { token } = req.body;
    try {
        const result = await JwtUtils.verifyToken(token);

        return Response.success(res, `User found and is authenticated`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err)

        return Response.error(res, ApiError.internal(err));
    };
};

module.exports = {
    newUser,
    users,
    login,
    authUser,
}