const { validate } = require("uuid");
const PaymentService = require("../Services/payment");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const basketItems = require("../Services/basketItems");

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

const removeBasketItem = async (req, res) => {
    try {
        const result = await basketItems.removeByOrderId("3c1d9a65-031e-4d3c-a07c-48d7f91b23b4");
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
    removeBasketItem
}