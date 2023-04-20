const db = require("../Models");
const { v4: uuid } = require("uuid");
const ProductCoverImageService = require("../Services/productCoverImage");
const ProductImageService = require("../Services/productImage");
const ProductTagsService = require("../Services/productTags");

class ProductService {
    async create(data) {
        const [newProduct, created] = await db.Product.findOrCreate({
            where: {
                title: data.title,
                description: data.description,
                categoryId: data.categoryId,
                quantityPerUnit: data.quantityPerUnit,
                unitPrice: data.unitPrice,
                sellPrice: data.sellPrice,
                weight: data.weight,
            }
        });

        const insertCoverImage = await ProductCoverImageService.insert(newProduct.id, data.coverImage);
        const insertImages = await ProductImageService.insertMany(newProduct.id, data.images);
        const insertTags = await ProductTagsService.insertMany(newProduct.id, data.tags);

        return newProduct
    };

    async findAll() {
        const products = await db.Product.findAll({ paranoid:false, include: ["categories"] });

        return products;
    };

    async findAllActive() {
        const products = await db.Product.findAll({ where: { active: true }, paranoid: false, include: ["category"] });

        return products;
    };

    async findOne(productId) {
        const product = await db.Product.findOne({ where: { id: productId }, paranoid: false, include: ["category"] });

        return product;
    };

    async update(productId, data) {
        const product = await this.product(productId);

        product.categoryId = 2;
        await product.save({ fields: ["categoryId"] });

        return product;
    };
};

module.exports = new ProductService();