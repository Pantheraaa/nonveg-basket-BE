const db = require("../Models");
const CustomerAddress = require("../Models/CustomerAddress");
const ApiError = require("../middlewares/apiError");

class CustomerAddressService {
    async insert(customerId, data) {
        const isDataSufficient = Object.keys(data).length;
        if (!isDataSufficient) throw ApiError.badRequest("Data is required to insert new address");

        const fetchDefaultAddress = await this.findDefaultAddress(customerId);
        if (fetchDefaultAddress && data.isDefault) throw ApiError.alreadyExists("Customer already has one default address");
        if (!fetchDefaultAddress && !data.isDefault) data.isDefault = true;

        const address = await db.CustomerAddress.create({
            name: data.name,
            mobile: data.mobile,
            address: data.address,
            cityDistrictTown: data.cityDistrictTown,
            state: data.state,
            landMark: data.landMark,
            locality: data.locality,
            pinCode: data.pinCode,
            alternateMobile: data.alternateMobile,
            isDefault: data.isDefault,
        });
        await address.setCustomer(customerId);
        return address;
    }

    async findByCustomerId(customerId) {
        const address = await db.CustomerAddress.findAll({
            where: { customer_id: customerId }
        });
        return address;
    }

    async findDefaultAddress(customerId) {
        const defaultAddress = await db.CustomerAddress.findOne({
            where: {
                customer_id: customerId,
                deletedAt: null,
                isDefault: true
            }
        });
        return defaultAddress;
    }

    async update(addressId, data) {
        const address = await db.CustomerAddress.findByPk(addressId);
        if (!address) throw ApiError.notFound("Incorrect address id");

        address.set(data);
        await address.save()
        return address;
    }

    async delete(addressId) {
        const address = await db.CustomerAddress.destroy({ where: { id: addressId } });
        if (!address) throw ApiError.notFound("Incorrect address id");
        return true;
    }
};

module.exports = new CustomerAddressService();