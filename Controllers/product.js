const { response } = require("express");
const { productImages } = require("../helpers/productImages");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const ProductService = require("../Services/product");

// Setup multer:
const newProduct = async (req, res) => {
    const data = productImages(req.body, req.files);
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

        return Response.success(res, `${result.length} Item(s) found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getActiveProducts = async (req, res) => {
    try {
        const result = await ProductService.findAllActive();

        return Response.success(res, `${result.length} Item(s) found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getOneProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const result = await ProductService.findOne(productId);

        return Response.success(res, `Item found.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const data = productImages(req.body, req.files);
    try {
        const result = await ProductService.update(productId, data);

        return Response.success(res, `Item updated successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const updateProductStatus = async (req, res) => {
    const productId = req.params.productId;
    try {
        const result = await ProductService.updateStatus(productId);

        return Response.success(res, `Item updated successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    };
};

const deleteProduct = async (req, res) => {
    const productId = req.params.productId;
    try {
        const result = await ProductService.delete(productId);

        return Response.success(res, "Item was deleted successfully");
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

module.exports = {
    newProduct,
    getProducts,
    getActiveProducts,
    getOneProduct,
    updateProduct,
    updateProductStatus,
    deleteProduct
}