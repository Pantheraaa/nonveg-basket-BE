const db = require("../Models");

class ShopServices {
    async create(name) {
        const newShop = await db.Shop.create({
            name: name
        });

        return newShop;
    };

    async findAll() {
        const shops = await db.Shop.findAll({ where: { active: true } })

        return shops;
    };

    async findOne(id) {
        const shop = await db.Shop.findByPk(id);

        return shop;
    }
};

module.exports = new ShopServices();