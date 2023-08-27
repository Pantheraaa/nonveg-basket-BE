const { validate } = require("uuid");
const PaymentService = require("../Services/payment");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");

const createNewOrder = async (req, res) => {
    try {
        const result = await PaymentService.createOrder(req.customer, req.body);
        return Response.success(res, `Order created successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const verifyPayment = async (req, res) => {
    try {
        const result = await PaymentService.paymentVerify(req.body);
        return Response.success(res, `Payment verified successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

module.exports = {
    // createNewOrder: [validate("createNewPayment"), createNewOrder] // middleware to validate the
    createNewOrder,
    verifyPayment,
}