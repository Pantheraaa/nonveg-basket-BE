const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class CustomerOrder extends Model {
        static associate({ Customer, DeliverySlots, DeliveryTimings, PaymentDetails }) {
            this.belongsTo(Customer, { foreignKey: "customer_id", as: "customer" });
            this.hasOne(DeliverySlots, {foreignKey: "delivery_slot_id", as: "DeliverySlot"})
            this.hasOne(DeliveryTimings, {foreignKey: "delivery_timing_id", as: "DeliveryTiming"})
            this.hasOne(PaymentDetails, {foreignKey: "payment_detail_id", as: "PaymentDetail"})
        };
    };

    CustomerOrder.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        payMode: {
            type: DataTypes.ENUM("ONLINE", "COD"),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("Attempted", "Confirmed", "Preparing", "Prepared", "Shipping", "Delivered", "Cancelled", "Other"),
            defaultValue: "Attempted",
            allowNull: false,
        },
        shipTo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipMobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shipAlternateMobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deliveryTimestamp: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    },
        {
            sequelize,
            tableName: "customerOrder",
            modelName: "CustomerOrder",
            underscored: true,
            timestamps: true,
            paranoid: true,
            defaultScope: {
                attributes: { exclude: ["updatedAt", "deletedAt"] }
            }
        });

    return CustomerOrder;
};