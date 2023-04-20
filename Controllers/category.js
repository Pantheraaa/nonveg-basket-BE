const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");
const CategoryService = require("../Services/category");

const newCategory = async (req, res) => {
    const { category } = req.body;
    try {
        const result = await CategoryService.create(category);

        return Response.success(res, "New category created successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getCategories = async (req, res) => {
    try {
        const result = await CategoryService.findAll();

        return Response.success(res, `${result.length} category(s) found`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const result = await CategoryService.findOne(categoryId);

        return Response.success(res, `Category found`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const updateCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    const { category } = req.body;
    try {
        const result = await CategoryService.update(categoryId, category);

        return Response.success(res, "Category updated successfully.", result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const deleteCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const result = await CategoryService.delete(categoryId);

        return Response.success(res, "Category deleted successfully.");
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const getCategoriesProducts = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const result = await CategoryService.findCategoryProducts(categoryId);

        return Response.success(res, `${result.length} category(s) products found`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};


module.exports = {
    newCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
    getCategoriesProducts
}