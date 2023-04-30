const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const UserCartService = require("../Services/userCart");

const createCart = async (req, res) => {
    const data = req.body;
    try {
        const result = await UserCartService.create(data);

        return Response.success(res, "New cart created successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const findUserCart = async (req, res) => {
    const userId = req.params.userId;
    try {
        const result = await UserCartService.findByUserId(userId);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));
    };
};

const removeFromCart = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const result = await UserCartService.remove(userId, productId);
        
        return Response.success(res, "Item removed from cart.");
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));        
    }
}

module.exports = {
    createCart,
    findUserCart,
    removeFromCart
}