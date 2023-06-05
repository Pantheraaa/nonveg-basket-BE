const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class BasketItems extends Model {
        static associate({ Basket, Product }) {
            this.belongsTo(Basket);
            // this.hasMany(Product);
        };
    };

    BasketItems.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        // productId: {
        //     type: DataTypes.UUID,
        //     allowNull: false
        // }
    }, {
        sequelize,
        tableName: "basketItems",
        modelName: "BasketItems",
        paranoid: true,
        underscored: true,
        defaultScope: {
            // include: ["Shop"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        }
    }
    );
    return BasketItems;
};