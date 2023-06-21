const BasketItemsServices = require("../Services/basketItems");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");

const insertItems = async (req, res) => {
    const customerId = req.customer.id;
    const { productId, quantity, price } = req.body;
    try {
        const result = await BasketItemsServices.insert(customerId, productId, quantity, price);
        return Response.success(res, `Item inserted successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const removeItem = async (req, res) => {
    const basketItemId = req.params.basketItemId;
    try {
        const result = await BasketItemsServices.remove(basketItemId);
        return Response.success(res, `Item removed successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const getCustomerBasket = async (req, res) => {
    const customerId = req.customer.id;
    try {
        const result = await BasketItemsServices.getBasketItems(customerId);
        return Response.success(res, `${result.length} item(s) found successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const increaseCustomerBasket = async (req, res) => {
    const basketItemId = req.params.basketItemId;
    try {
        const result = await BasketItemsServices.increaseQuantity(basketItemId);
        return Response.success(res, `Quantity increased successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const decreaseCustomerBasket = async (req, res) => {
    const basketItemId = req.params.basketItemId;
    try {
        const result = await BasketItemsServices.decreaseQuantity(basketItemId);
        return Response.success(res, `Quantity increased successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

module.exports = {
    insertItems,
    removeItem,
    getCustomerBasket,
    increaseCustomerBasket,
    decreaseCustomerBasket
}