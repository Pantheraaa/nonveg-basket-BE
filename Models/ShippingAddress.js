const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class ShippingAddress extends Model {
        static associate({ CustomerOrder }) {
            this.belongsTo(CustomerOrder, { foreignKey: "customer_order_id", as: "customerOrder" });
        };
    };

    ShippingAddress.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        fullAddress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        pinCode: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alternateMobile: {
            type: DataTypes.STRING,
        },
    },
        {
            sequelize,
            tableName: "shippingAddress",
            modelName: "ShippingAddress",
            underscored: true,
            timestamps: true,
            paranoid: true,
            defaultScope: {
                attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
            }
        });

    return ShippingAddress;
};