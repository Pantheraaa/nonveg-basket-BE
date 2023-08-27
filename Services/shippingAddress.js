const db = require("../Models");

class ShippingAddressService{
    async create(orderId, data) {
        const address = db.ShippingAddress.create({
            name: data.name,
            mobile: data.mobile,
            fullAddress: `${data.address} ${data.landMark} ${data.locality} ${data.cityDistrictTown}`,
            state: data.state,
            pinCode: data.pinCode,
            alternateMobile: data.alternateMobile,
            customer_order_id: orderId,
        });

        return address;
    }
};

module.exports = new ShippingAddressService();