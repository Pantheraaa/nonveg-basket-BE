const db = require("../Models");
const ApiError = require("../middlewares/apiError");
const bcrypt = require("bcrypt");

class CustomerService {
    async findAll() {
        const customers = await db.Customer.findAll();
        return customers;
    };

    async create(data) {
        if (!data.mobile) throw ApiError.badRequest("Mobile is required.");

        const salt = await bcrypt.genSalt();
        data.pin = await bcrypt.hash(data.pin, salt);
        const newCustomer = await db.Customer.create(data);
        return newCustomer;
    };

    async login(mobile, pin) {
        if (!mobile || !pin) throw ApiError.badRequest("Invalid credential.");

        const customer = await this.findByMobile(mobile);
        if (!customer) throw ApiError.notFound("Customer does not exists.");

        const isPinVerified = await bcrypt.compare(pin, customer.pin);
        if (!isPinVerified) throw ApiError.notAuthorized("Invalid credential.");

        return customer;
    };

    async findByMobile(mobile) {
        const customer = await db.Customer.findOne({ mobile: mobile });
        return customer;
    };
};

module.exports = new CustomerService();