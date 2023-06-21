const JwtUtils = require("../utils/jwt");
const ApiError = require("./apiError");
const Response = require("./response");
const CustomerService = require("../Services/customer");

module.exports = async (req, res, next) => {
    const token = req.headers.token || req.headers.Token;
    if (!token || token == "")
        return Response.error(res, ApiError.badRequest("Token is required!"));
    try {
        const verifiedCustomer = await JwtUtils.verifyToken(token);
        if (!verifiedCustomer)
            return Response.error(res, ApiError.notAuthorized("Customer not authorized"));

        const authorizedCustomer = await CustomerService.findById(verifiedCustomer.id);
        if (!authorizedCustomer)
            return Response.error(res, ApiError.notAuthorized("Customer not authorized"));

        req.customer = authorizedCustomer;
        return next();
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, ApiError.notAuthorized());

        return Response.error(res, ApiError.internal(err));
    }
}