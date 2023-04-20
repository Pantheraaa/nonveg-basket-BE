const db = require("../Models");
const { UUID } = require("sequelize");

class ProductTagsService {
    async insert(productId, tag) {
        const newTag = await db.ProductTags.create({
            productId: productId,
            tag: tag,
        });
    }

    async insertMany(productId, tags) {
        for await (const tag of tags) {
            await this.insert(productId, tag);
        };
    };
};

module.exports = new ProductTagsService();