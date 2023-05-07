const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const ShopServices = require("../Services/shop");

const newShop = async (req, res) => {
    const { name } = req.body;
    try {
        const result = await ShopServices.create(name);

        return Response.success(res, "New shop created successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));
    };
};

const getAllShop = async (req, res) => {
    try {
        const result = await ShopServices.findAll();

        return Response.success(res, `${result.length} shop(s) found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));
    };
};

const getOneShop = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await ShopServices.findOne(id);

        return Response.success(res, `Shop found successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);
        
        return Response.error(res, ApiError.internal(err));
    }
}

module.exports = {
    newShop,
    getAllShop,
    getOneShop
};
