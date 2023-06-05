const db = require("../Models");
const { v4: uuid } = require("uuid");
const ProductCoverImageService = require("../Services/productCoverImage");
const ProductImageService = require("../Services/productImage");
const ProductTagsService = require("../Services/productTags");
const ProductCategoryService = require("../Services/productCategory");
const ApiError = require("../middlewares/apiError");
const CategoryService = require("./category");
class ProductService {
    async create(data) {
        const [product, created] = await db.Product.findOrCreate({
            where: {
                title: data.title,
                description: data.description,
                quantityPerUnit: data.quantityPerUnit * 1,
                unitPrice: data.unitPrice * 1,
                sellPrice: data.sellPrice * 1,
                weight: data.weight,
            }
        });

        if (!created) return product;

        const insertCategory = await ProductCategoryService.insert(product.id, data.categoryId);
        const insertImages = await ProductImageService.insertMany(product.id, data.images);
        // const insertTags = await ProductTagsService.insertMany(product.id, data.tags);
        const insertCoverImage = await ProductCoverImageService.insert(product.id, data.coverImage);

        return product
    };

    async findAll() {
        const products = await db.Product.findAll({ order: [["updatedAt", "DESC"]] });

        for (let product of products) {
            product = this.formatProducts(product.dataValues);
        }

        return products;
    };

    async findAllActive(category) {
        let products;
        const categoryId = await CategoryService.findCategoryIdByName(category);
        if (categoryId) {
            products = await db.sequelize.query(
                `SELECT p.*, pci.coverImage, pc.category_id
            FROM products as p
            JOIN
                productcoverimage as pci
                ON pci.ProductId = p.id
            JOIN
                productcategory as pc
                ON pc.product_id = p.id
            WHERE
                pc.category_id = "${categoryId}"
                AND p.active = 1
                AND p.deleted_at is NULL;`, { type: db.sequelize.QueryTypes.SELECT }
            )
        } else {
            products = await db.Product.findAll({ where: { active: true } });
            for (let product of products) {
                product = this.formatProducts(product.dataValues);
            }
        };

        return products;
    };

    async findOne(productId) {
        let product = await db.Product.findOne({ where: { id: productId } });

        if (!product)
            throw ApiError.notFound("Item not found.");

        product = this.formatProducts(product);
        return product;
    };

    async update(productId, data) {
        const { categoryId, coverImage, images, ...basic } = data;
        if (categoryId) await ProductCategoryService.update(productId, categoryId);
        if (coverImage) await ProductCoverImageService.update(productId, coverImage);

        // Images not updating yet:
        if (images.length) await ProductImageService.update(productId, images);

        // Update tags also;

        let product = await this.findOne(productId);
        product.set(basic);
        product = await product.save();

        return product;
    };

    async updateStatus(productId) {
        let product = await this.findOne(productId);
        product.set({ active: !product.active });
        product = await product.save();

        return true;
    }

    async delete(productId) {
        const product = await this.findOne(productId);

        const deleteProduct = await db.Product.destroy({ where: { id: productId } });

        return true;
    }

    formatProducts(item) {
        const { Category } = item.ProductCategory || {};
        item.category = Category;
        delete item.ProductCategory;

        const { coverImage } = item.ProductCoverImage || {};
        item.coverImage = coverImage;
        delete item.ProductCoverImage;

        const images = [];
        for (const pImage of item.ProductImages) {
            const { id, image } = pImage;

            images.push({ id, image });
        }
        item.images = images;
        delete item.ProductImages;

        // const tags = [];
        // for (const pTags of item.ProductTags) {
        //     const { id, tag } = pTags;

        //     tags.push({ id, tag });
        // }
        // item.tags = tags;
        // delete item.ProductTags;

        return item;
    }
};

module.exports = new ProductService();