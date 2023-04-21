const db = require("../Models");
const ApiError = require("../middlewares/apiError");

class ProductCategoryService {
    async insert(productId, categoryId) {
        const fetchCategory = await this.find(productId);

        const insertCategory = db.ProductCategory.create({
            ProductId: productId,
            CategoryId: categoryId,
        });

        return insertCategory;
    };

    async find(productId) {
        const productCategory = await db.ProductCategory.findOne({ where: { ProductId: productId } });

        return productCategory;
    };

    async update(productId, categoryId) {
        let updateCategory = await db.ProductCategory.findOne({ where: { ProductId: productId } });

        updateCategory.set({ CategoryId: categoryId });
        updateCategory = await updateCategory.save();

        return updateCategory;
    };

    async delete(productId) {
        const fetchCategory = await db.ProductCategory.findOne({ where: { ProductId: productId } });

        if (!fetchCategory)
            throw ApiError.notFound("Product category not found");

        const deletedProductCategory = await db.ProductCategory.destroy({ where: { ProductId: productId } });

        return deletedProductCategory;
    }

};

module.exports = new ProductCategoryService();