const { UUID } = require("sequelize");
const db = require("../Models");
const ApiError = require("../middlewares/apiError");
const Product = require("../Models/Product");

class CategoryService {
    async create(category) {
        const [newCategory, created] = await db.Category.findOrCreate({
            where: {
                category: category
            }
        });

        return newCategory;
    };

    async findAll() {
        const categories = await db.Category.findAll({ where: { active: true } });

        return categories;
    };

    async findOne(categoryId) {
        const category = await db.Category.findByPk(categoryId);

        if (!category)
            throw ApiError.notFound("Category not found");

        if (!category.active)
            throw ApiError.notActive("Category found but not active");

        return category;
    };

    async update(categoryId, category) {
        const fetchedCategory = await db.Category.findByPk(categoryId);

        if (!fetchedCategory)
            throw ApiError.notFound("Category not found");

        fetchedCategory.category = category;
        await fetchedCategory.save({ fields: ["category"] });

        return fetchedCategory;
    };

    async delete(categoryId) {
        const fetchCategory = await this.findOne(categoryId);

        if (!fetchCategory)
            throw ApiError.notFound("Category not found");

        const deletedCategory = await db.Category.destroy({ where: { id: categoryId } });

        return deletedCategory;
    };

    async findCategoryProducts(categoryId) {
        const categories = await db.Category.findByPk(categoryId, { include: ["product"] });

        return categories;
    };

};

module.exports = new CategoryService();