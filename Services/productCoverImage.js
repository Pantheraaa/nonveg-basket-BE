const db = require("../Models");
const ApiError = require("../middlewares/apiError");

class ProductCoverImageService {
    async insert(productId, coverImage) {
        const fetchCoverImage = await this.find(productId);

        if (fetchCoverImage)
            throw ApiError.alreadyExists("Cover image already exists of this product");

        const insertCoverImage = db.ProductCoverImage.create({
            ProductId: productId,
            coverImage: coverImage,
        });

        return insertCoverImage;
    };

    async find(productId) {
        const coverImage = await db.ProductCoverImage.findOne({ where: { productId: productId } });

        return coverImage;
    };

    async update(productId, coverImage) {
        let updateCoverImage = await db.ProductCoverImage.findOne({ where: { productId: productId } });

        updateCoverImage.set({ coverImage: coverImage });
        updateCoverImage = await updateCoverImage.save();
        return updateCoverImage;
    };

    async delete(productId) {
        const updateCoverImage = await db.ProductCoverImage.findOne({ where: { productId: productId } });

        if (!updateCoverImage)
            throw ApiError.notFound("Cover image not found");

        const deletedCoverImage = await db.ProductCoverImage.destroy({ where: { productId: productId } });

        return deletedCoverImage;
    }

};

module.exports = new ProductCoverImageService();