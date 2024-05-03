const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env;
const Razorpay = require("razorpay");
const ApiError = require("../middlewares/apiError");
const { validatePaymentVerification } = require("razorpay/dist/utils/razorpay-utils");
const ShippingAddressService = require("./shippingAddress");
const ProductService = require("./product");
const CustomerOrderService = require("./customerOrder");
const CustomerOrderItems = require("./customerOrderItems");
const db = require("../Models");
const BasketItemsService = require("./basketItems");

class PaymentService {
    async createInstance() {
        const instance = new Razorpay({
            key_id: RAZORPAY_KEY_ID,
            key_secret: RAZORPAY_KEY_SECRET
        });

        return instance;
    };

    async createOrder(customer, data) {
        const { products, address, deliverySlot, payMode } = data;
        if (!products || !address || !deliverySlot || !payMode)
            throw ApiError.badRequest("Invalid request, insufficient data to create order");

        // Store order details into DB ("Attempt"):
        const newOrder = await CustomerOrderService.create(customer.dataValues.id, data);

        // Storing all ordered items and their quantity and amount:
        let totalAmount = 0;
        const items = [];
        const productIds = products.map(prod => prod.id);
        const allProducts = await ProductService.findMutiple(productIds);

        products.map(async product => {
            const item = allProducts.find((prod) => prod.dataValues.id === product.id);
            product.amountPerUnit = item.sellPrice;
            product.totalAmount = item.sellPrice * product.quantity;

            items.push({ id: product.id, qtyPrice: `${product.quantity} | ${item.sellPrice}` });
            totalAmount += product.totalAmount;

            await CustomerOrderItems.create(newOrder.dataValues.id, product);

            delete product.quantity;
            delete product.amountPerUnit;
            delete product.totalAmount;
            product.qtyPrice = `${product.quantity} | ${item.sellPrice}`
    
            return product;
        })
        
        // Update existing order amount, if storedAmount !== totalAmount
        if (newOrder.dataValues.amount !== totalAmount) {
            let existingOrder = await CustomerOrderService.findOne(newOrder.dataValues.id);
            existingOrder.set({ amount: totalAmount });
            existingOrder = await existingOrder.save();
        }
        
        const instance = await this.createInstance();
        const txnid = Math.floor((Date.now()) / 100).toString();

        const options = {
            amount: totalAmount * 100,
            currency: "INR",
            receipt: txnid,
            notes: {
                items: JSON.stringify(items),
                customerName: customer.dataValues.name,
                email: customer.dataValues.email,
                mobile: customer.dataValues.mobile
            }
        }

        const order = await instance.orders.create(options);

        // Store order details into payment details table:
        await this.insertPaymentDetails(newOrder.dataValues.id, order);

        return order;
    };


    async paymentVerify(data) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, basketId } = data;

        const isValidSign = validatePaymentVerification({
            order_id: razorpay_order_id,
            payment_id: razorpay_payment_id
        }, razorpay_signature, RAZORPAY_KEY_SECRET);


        if (!isValidSign) throw ApiError.notAuthorized("Razorpay signature verification failed");

        // Update order in Database, Update basketItems:
        const updateOrder = await this.updateOrderDetails(data);
        const updateBasket = await BasketItemsService.removeByOrderId(updateOrder, basketId);
        return updateOrder;
    };

    async insertPaymentDetails(orderId, data) {
        const paymentDetails = await db.PaymentDetails.create({
            razorpayOrderId: data.id,
            amount: data.amount / 100,
            txnId: data.receipt,
            razorpayStatus: data.status,
            customerName: data.notes.customerName,
            email: data.notes.email,
            mobile: data.notes.mobile,
            timestamp: data.created_at,
            details: JSON.stringify(data),
            paymentStatus: "Due",
            customerOrderId: orderId,
        });

        const updateCustomerOrderQuery = "UPDATE CustomerOrder SET payment_detail_id = ? WHERE id = ?";
        await db.sequelize.query(updateCustomerOrderQuery, { replacements: [paymentDetails.dataValues.id, orderId] });
        return paymentDetails;
    }

    async updateOrderDetails(data) {
        const paymentDetails = await this.updatePaymentDetails(data);
        const order = await CustomerOrderService.update(paymentDetails.dataValues.customerOrderId, {
            status: "Confirmed",
            payment_detail_id: paymentDetails.dataValues.id
        });
        return order;
    };

    async updatePaymentDetails(data) {
        const { razorpay_order_id, basketId, ...updateData } = data;
        let paymentDetails = await this.findByRazorpayOrderId(razorpay_order_id);

        paymentDetails.set({ ...updateData, paymentStatus: "Paid" });
        paymentDetails = await paymentDetails.save();

        return paymentDetails;
    };

    async findByRazorpayOrderId(razorpayOrderId) {
        const paymentDetails = await db.PaymentDetails.findOne({ where: { razorpay_order_id: razorpayOrderId } });

        if (!paymentDetails)
            throw ApiError.notFound("Incorrect razorpay order id");

        return paymentDetails;
    }
};

module.exports = new PaymentService();