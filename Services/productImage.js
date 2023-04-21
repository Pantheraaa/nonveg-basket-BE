const { UUID } = require("sequelize");
const db = require("../Models");
const ApiError = require("../middlewares/apiError");

class ProductImageService {
    async insert(productId, image) {
        const insertImage = db.ProductImages.create({
            ProductId: productId,
            image: image,
        });
    };

    async insertMany(productId, images) {
        for await (const image of images) {
            this.insert(productId, image);
        };
    }

    async find(productId) {
        const images = await db.ProductImages.findAll({ where: { productId: productId} });

        if (!images.length)
            throw ApiError.notFound("Image(s) not found");

        return images;
    };

    // --------------------This update function will be updated--------------------
    async update(productId, images) {
        const updateImages = await db.ProductImages.findAll({ where: { productId: productId} });

        // next line should be change, updateImages treated as object but actually it's an array;
        updateImages.image = coverImage;
        await updateImages.save({ fields: ["coverImage"] });

        return updateImages;
    };

    // --------------------This delete function will be updated--------------------
    async delete(imageId) {
        const deletedCoverImage = await db.ProductImages.destroy({ where: { id: imageId } });

        return true;
    }

};

module.exports = new ProductImageService();