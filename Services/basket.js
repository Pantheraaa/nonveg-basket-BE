const db = require("../Models");

class BasketServices {
    async create(customerId) {
        const basket = await db.Basket.create();
        await basket.setCustomer(customerId);

        return basket;
    };
};

module.exports = new BasketServices();