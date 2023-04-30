const db = require("../Models");

class UserCartService {
    async create({ userId, productId }) {
        const newCart = await db.UserCart.create({
            userId: userId,
            ProductId: productId
        });

        return newCart;
    };

    async findByUserId(userId) {
        const cart = await db.UserCart.findOne({ userId: userId });

        return cart;
    };

    async remove(userId, productId) {
        const removedItem = await db.UserCart.destroy({ where: { userId: userId, ProductId: productId } });

        return true;
    }
};

module.exports = new UserCartService();