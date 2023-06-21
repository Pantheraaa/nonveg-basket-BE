const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const CustomerService = require("../Services/customer");

const getCustomers = async (req, res) => {
    try {
        const result = await CustomerService.findAll();
        return Response.success(res, `${result.length} customer(s) found successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const newCustomer = async (req, res) => {
    try {
        const result = await CustomerService.create(req.body);
        return Response.success(res, `Customer created successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const customerLogin = async (req, res) => {
    const { mobile, pin } = req.body;
    try {
        const result = await CustomerService.login(mobile, pin);
        return Response.success(res, `Customer logged in successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));
    }
};

const customerAuthentication = async (req, res) => {
    try {
        const result = req.customer;
        return Response.success(res, `Customer found & logged in successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));        
    }
}

module.exports = {
    getCustomers,
    newCustomer,
    customerLogin,
    customerAuthentication,
}