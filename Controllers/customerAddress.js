const CustomerAddressService = require("../Services/customerAddress");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");

const addCustomerAddress = async (req, res) => {
    const { id: customerId } = req.customer;
    const data = req.body;
    try {
        const result = await CustomerAddressService.insert(customerId, data);
        return Response.success(res, `Customer address created successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const findCustomerAddresses = async (req, res) => {
    const { id: customerId } = req.customer;
    try {
        const result = await CustomerAddressService.findByCustomerId(customerId);
        return Response.success(res, `Customer's ${result.length} address(s) found successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const updateCustomerAddress = async (req, res) => {
    const addressId = req.params.addressId;
    const data = req.body;
    try {
        const result = await CustomerAddressService.update(addressId, data);
        return Response.success(res, `Customer address updated successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

const deleteCustomerAddress = async (req, res) => {
    const addressId = req.params.addressId;
    try {
        const result = await CustomerAddressService.delete(addressId);
        return Response.success(res, `Customer address deleted successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
};

module.exports = {
    addCustomerAddress,
    findCustomerAddresses,
    updateCustomerAddress,
    deleteCustomerAddress,
}