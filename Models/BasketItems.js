const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class BasketItems extends Model {
        static associate({ Basket, Product }) {
            this.belongsTo(Basket, { foreignKey: 'basketId' });
            this.belongsTo(Product, { foreignKey: 'productId' });
            // this.hasMany(Product);
        };

        static increseQuantity(itemId) {
            return this.increment('quantity', { by: 1, where: { id: itemId } });
        }
    };

    BasketItems.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
        },
        // price: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        //     defaultValue: 0,
        // }
    }, {
        sequelize,
        tableName: "basketItems",
        modelName: "BasketItems",
        paranoid: true,
        underscored: true,
        defaultScope: {
            // include: ["Shop"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt", "productId", "ProductId"] }
        }
    }
    );
    return BasketItems;
};