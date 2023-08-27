const db = require("../Models");
const { UUID } = require("sequelize");

class ProductTagsService {
    async insert(productId, tag) {
        const newTag = await db.ProductTags.create({
            ProductId: productId,
            tag: tag,
        });

        return true;
    }

    async insertMany(productId, tags) {
        for await (const tag of tags) {
            await this.insert(productId, tag);
        };

        return true;
    };
};

module.exports = new ProductTagsService();