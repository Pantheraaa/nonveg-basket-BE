const db = require("../Models");

class BasketItemsServices {
    async insert(customerId, productId, quantity, price) {
        const basket = await db.Basket.findOne({ customerId });

        // Checking if product is already exists in basket:
        const isItemExist = await db.BasketItems.findOne({
            where: {
                basketId: basket.id,
                productId: productId
            }
        });

        if (!isItemExist) return this.createBasketItem(basket.id, productId, quantity, price);
        if (isItemExist) return this.increaseQuantity(isItemExist.id, quantity);
    };

    async createBasketItem(basketId, productId, quantity, price) {
        const newItem = db.BasketItems.create({
            basketId: basketId,
            productId: productId,
            quantity,
            price
        });
        return newItem;
    }

    async getBasketItems(customerId) {
        const { id: basketId } = await db.Basket.findOne({ customerId: customerId });
        // console.log(">>>", basketId);
        const items = await db.BasketItems.findAll({
            where: {
                basketId
            },
            include: ["Product"]
        });
        return items;
    };

    async remove(basketItemId) {
        // Finding item's price to reduce cart value on front-end:
        const item = await db.BasketItems.findOne({ where: { id: basketItemId } });

        const deletedItem = await db.BasketItems.destroy({ where: { id: basketItemId } });
        return item.dataValues.price;
    }

    async removeMany(items) {
        const query = ""
    }

    async increaseQuantity(basketItemId, quantity) {
        await db.sequelize.query(`
        UPDATE BasketItems SET quantity = quantity + ${quantity || 1} WHERE id = "${basketItemId}"`,
            { type: db.sequelize.QueryTypes.UPDATE }
        );
        return true;
    }

    async decreaseQuantity(basketItemId) {
        await db.sequelize.query(`
        UPDATE BasketItems SET quantity = quantity - 1 WHERE id = "${basketItemId}"`,
            { type: db.sequelize.QueryTypes.UPDATE }
        );
        return true;
    }
};

module.exports = new BasketItemsServices();