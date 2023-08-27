const db = require("../Models");
const ApiError = require("../middlewares/apiError");

class CustomerOrderService {
    async create(data) {
        const { address } = data;
        console.log("ADD", address);
        const order = db.CustomerOrder.create({
            amount: data.totalAmount,
            payMode: data.payMode,
            shipTo: address.name,
            shipMobile: address.mobile,
            shipAlternateMobile: address.alternateMobile,
            shippingAddress: `${address.address} ${address.cityDistrictTown} ${address.landMark} ${address.locality} ${address.state} - ${address.pinCode}`,
            deliveryTimestamp: "2023-08-15",
        });

        return order;
    };

    async findOne(orderId) {
        const order = await db.CustomerOrder.findOne({ where: { id: orderId } });

        if (!order) throw ApiError.notFound("Order not found");
        return order;
    };

    async update(id, data) {
        let order = await this.findOne(id);
        order.set(data);
        order = order.save();

        return order;
    }
}

module.exports = new CustomerOrderService();