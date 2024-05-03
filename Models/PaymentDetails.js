const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class PaymentDetails extends Model {
        static associate({ CustomerOrder }) {
            this.belongsTo(CustomerOrder, { as: "customerOrder" });
            // this.hasOne(DeliverySlots, { foreignKey: "delivery_slot_id", as: "DeliverySlot" })
            // this.hasOne(DeliveryTimings, { foreignKey: "delivery_timing_id", as: "DeliveryTiming" })
        };
    };

    PaymentDetails.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        razorpayOrderId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        txnId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        razorpayStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        customerName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        timestamp: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        razorpay_payment_id: {
            type: DataTypes.STRING,
        },
        razorpay_signature: {
            type: DataTypes.STRING,
        },
        details: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        paymentStatus: {
            type: DataTypes.ENUM("Paid", "Due", "Cancelled"),
            allowNull: false
        }
    },
        {
            sequelize,
            tableName: "paymentDetails",
            modelName: "PaymentDetails",
            underscored: true,
            timestamps: true,
            paranoid: true,
            defaultScope: {
                attributes: { exclude: ["updatedAt", "deletedAt"] }
            }
        });

    return PaymentDetails;
};