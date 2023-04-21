const db = require("../Models");
const { v4: uuid } = require("uuid");
const ProductCoverImageService = require("../Services/productCoverImage");
const ProductImageService = require("../Services/productImage");
const ProductTagsService = require("../Services/productTags");
const ProductCategoryService = require("../Services/productCategory");
const ApiError = require("../middlewares/apiError");

class ProductService {
    async create(data) {
        const [product, created] = await db.Product.findOrCreate({
            where: {
                title: data.title,
                description: data.description,
                // categoryId: data.categoryId,
                quantityPerUnit: data.quantityPerUnit,
                unitPrice: data.unitPrice,
                sellPrice: data.sellPrice,
                weight: data.weight,
            }
        });

        if (!created) return product;

        const insertCategory = await ProductCategoryService.insert(product.id, data.categoryId);
        const insertImages = await ProductImageService.insertMany(product.id, data.images);
        const insertTags = await ProductTagsService.insertMany(product.id, data.tags);
        const insertCoverImage = await ProductCoverImageService.insert(product.id, data.coverImage);

        return product
    };

    async findAll() {
        const products = await db.Product.findAll({ paranoid: false });

        for (let product of products) {
            product = this.formatProducts(product);
        }

        return products;
    };

    async findAllActive() {
        const products = await db.Product.findAll({ where: { active: true }, paranoid: false });

        return products;
    };

    async findOne(productId) {
        let product = await db.Product.findOne({ where: { id: productId }, paranoid: false });

        if (!product)
            throw ApiError.notFound("Item not found.");

        product = this.formatProducts(product);
        return product;
    };

    async update(productId, data) {
        if (data.categoryId) await ProductCategoryService.update(productId, data.categoryId);
        if (data.coverImage) await ProductCoverImageService.update(productId, data.coverImage);

        // Images not updating yet:
        if (data.images) await ProductImageService.update(productId, data.images);

        // Update tags also;

        let product = await this.findOne(productId);
        product.set(data);
        product = await product.save();

        return product;
    };

    async delete(productId) {
        const product = await this.findOne(productId);

        const deleteProduct = await db.Product.destroy({ where: { id: productId } });

        return true;
    }

    formatProducts(item) {
        const { Category } = item.ProductCategory;
        item.category = Category.category;
        delete item.ProductCategory;

        const { coverImage } = item.ProductCoverImage;
        item.coverImage = coverImage;
        delete item.ProductCoverImage;

        const images = [];
        for (const pImage of item.ProductImages) {
            const { id, image } = pImage;

            images.push({ id, image });
        }
        item.images = images;
        delete item.ProductImages;

        const tags = [];
        for (const pTags of item.ProductTags) {
            const { id, tag } = pTags;

            tags.push({ id, tag });
        }
        item.tags = tags;
        delete item.ProductTags;

        return item;
    }
};

module.exports = new ProductService();