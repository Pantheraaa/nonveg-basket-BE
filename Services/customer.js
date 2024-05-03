const db = require("../Models");
const ApiError = require("../middlewares/apiError");
const bcrypt = require("bcrypt");
const BasketServices = require("../Services/basket");
const JwtUtils = require("../utils/jwt");
const { Op } = require("sequelize");

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
        const orders = await db.CustomerOrder.findAll({
            where: {
                customer_id: customerId,
                status: {
                    [Op.ne]: "Attempted"
                }
            },
            include: [
                {
                    model: db.PaymentDetails,
                    as: "PaymentDetail"
                },
                {
                    model: db.CustomerOrderItems,
                    as: "items",
                    attributes: {
                        exclude: ["amountPerUnit", "totalAmount", "CustomerOrderId", "customer_order_id", "productId", "createdAt", "updatedAt", "deletedAt", "ProductImages"]
                    },
                    include: [{
                        model: db.Product,
                        as: "product",
                        attributes: {
                            exclude: ["quantityPerUnit", "unitPrice", "sellPrice", "weight", "active", "createdAt", "updatedAt", "deletedAt"]
                        },
                    }],
                },
            ],
            order: [
                ['createdAt', "DESC"]
            ],
            attributes: {
                exclude: ["status", "shipTo", "shipMobile", "shipAlternateMobile", "shippingAddress", "deliveryTimestamp", "createdAt"]
            }
        });
        return orders;
    }
};

module.exports = new CustomerService();