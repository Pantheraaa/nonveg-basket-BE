const { UUID } = require("sequelize");
const db = require("../Models");
const ApiError = require("../middlewares/apiError");
const Product = require("../Models/Product");

class CategoryService {
    async create(category) {
        const [newCategory, created] = await db.Categories.findOrCreate({
            where: {
                category: category
            }
        });

        return newCategory;
    };

    async findAll() {
        const categories = await db.Categories.findAll({ where: { active: true } });

        return categories;
    };

    async findOne(categoryId) {
        const category = await db.Categories.findByPk(categoryId);

        if (!category)
            throw ApiError.notFound("Category not found");

        return category;
    };

    async findCategoryIdByName(category) {
        const fetchedCategory = await db.Categories.findOne({ where: { category: category } });

        return fetchedCategory?.dataValues?.id;
    }

    async update(categoryId, category) {
        const fetchedCategory = await db.Categories.findByPk(categoryId);

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

        const deletedCategory = await db.Categories.destroy({ where: { id: categoryId } });

        return deletedCategory;
    };
};

module.exports = new CategoryService();