const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class CustomerOrderItems extends Model {
        static associate({ CustomerOrder, Product }) {
            this.belongsTo(CustomerOrder, { foreignKey: "customer_order_id", as: "customerOrder" });
            this.belongsTo(Product, { foreignKey: 'productId', as: "product" });
        };
    };

    CustomerOrderItems.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amountPerUnit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalAmount: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
        {
            sequelize,
            tableName: "customerOrderItems",
            modelName: "CustomerOrderItems",
            underscored: true,
            timestamps: true,
            paranoid: true,
            defaultScope: {
                include: ["product"],
                attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
            }
        });

    return CustomerOrderItems;
};