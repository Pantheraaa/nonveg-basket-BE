const { UUID } = require("sequelize");
const db = require("../Models");
const ApiError = require("../middlewares/apiError");

class ProductImageService {
    async insert(productId, image) {
        const insertImage = db.ProductImages.create({
            ProductId: productId,
            image: image,
        });

        return true;
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
        // const updateImages = await db.ProductImages.findAll({ where: { productId: productId} });

        // next line should be change, updateImages treated as object but actually it's an array;
        // updateImages.image = coverImage;
        // await updateImages.save({ fields: ["coverImage"] });

        // Removing old images, uploading new:
        await this.deleteAll(productId);
        const updateImages = await this.insertMany(productId, images);

        return updateImages;
    };

    async deleteAll(productId) {
        const deletedImages = await db.ProductImages.destroy({ where: { ProductId: productId } });
        return true;
    }

    // --------------------This delete function will be updated--------------------
    async deleteOne(imageId) {
        const deletedImage = await db.ProductImages.destroy({ where: { id: imageId } });

        return true;
    }

};

module.exports = new ProductImageService();