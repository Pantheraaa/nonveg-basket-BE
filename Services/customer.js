const db = require("../Models");
const ApiError = require("../middlewares/apiError");
const bcrypt = require("bcrypt");
const BasketServices = require("../Services/basket");
const JwtUtils = require("../utils/jwt");

class CustomerService {
    async findAll() {
        const customers = await db.Customer.findAll();
        return customers;
    };

    async findById(id) {
        const customer = await db.Customer.findByPk(id);
        return customer;
    }

    async create(data) {
        if (!data.mobile) throw ApiError.badRequest("Mobile is required.");

        const salt = await bcrypt.genSalt();
        data.pin = await bcrypt.hash(data.pin, salt);
        const newCustomer = await db.Customer.create(data);
        const newBasket = await BasketServices.create(newCustomer.dataValues.id);
        return newCustomer;
    };

    async update(id, data) {
        const updatedCust = await db.Customer.update(data, { where: { id: id } });
        return true;
    };

    async login(mobile, pin) {
        if (!mobile) throw ApiError.badRequest("Invalid credential.");

        const customer = await this.findByMobile(mobile);
        if (!customer) throw ApiError.notFound("Customer does not exists.");
        if (!pin.trim().length) throw ApiError.badRequest("Customer exists but required pin to login");

        const isPinVerified = await bcrypt.compare(pin, customer.pin);
        if (!isPinVerified) throw ApiError.notAuthorized("Invalid credential.");

        // Generating JWT token:
        customer.dataValues.token = await JwtUtils.generateToken(customer.dataValues);
        return customer;
    };

    async findByMobile(mobile) {
        const customer = await db.Customer.findOne({ where: { mobile: mobile } });
        return customer;
    };

    async orders(customerId) {
        // const orders = await db.CustomerOrder.findAll({ where: { customer_id: customerId } });
        const query = `SELECT * FROM customerorder WHERE customer_id = "${customerId}" AND status != "Attempted" AND deleted_at IS NULL`;
        console.log(">>>>", query)
        // await db.sequelize.query(`
        // UPDATE BasketItems SET quantity = quantity + ${quantity || 1} WHERE id = "${basketItemId}"`,
        //     { type: db.sequelize.QueryTypes.UPDATE }
        // );

        const orders = await db.sequelize.query(query, { type: db.sequelize.QueryTypes.SELECT });
        return orders;
    }
};

module.exports = new CustomerService();