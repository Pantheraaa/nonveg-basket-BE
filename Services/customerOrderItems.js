const db = require("../Models");

class CustomerOrderItems {
    async create(orderId, item) {
        const orderedItem = await db.CustomerOrderItems.create({
            product_id: item.id,
            quantity: item.quantity,
            amountPerUnit: item.amountPerUnit,
            totalAmount: item.totalAmount,
            customer_order_id: orderId,
        });

        return orderedItem;
    };
};

module.exports = new CustomerOrderItems();