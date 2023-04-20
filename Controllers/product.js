const { productImages } = require("../helpers/productImages");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const ProductService = require("../Services/product");

// Setup multer:
const newProduct = async (req, res) => {
    const { coverImage, images } = productImages(req.files);
    let data = req.body;
    data.images = images;
    data.coverImage = coverImage;
    try {
        const result = await ProductService.create(data);

        return Response.success(res, "New product created successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const getProducts = async (req, res) => {
    try {
        const result = await ProductService.findAll();

        return Response.success(res, `${result.length} Product(s) found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getActiveProducts = async (req, res) => {
    try {
        const result = await ProductService.findAllActive();

        return Response.success(res, `${result.length} Product(s) found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getOneProduct = async (req, res) => {
    const productId = req.params.productId
    try {
        const result = await ProductService.findOne(productId);

        return Response.success(res, `Product found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.productId
    const data = req.body;
    try {
        const result = await ProductService.update(productId, data);

        return Response.success(res, `Product updated successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

module.exports = {
    newProduct,
    getProducts,
    getActiveProducts,
    getOneProduct,
    updateProduct,
}