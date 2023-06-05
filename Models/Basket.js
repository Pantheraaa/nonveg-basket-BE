const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Basket extends Model {
        static associate({ Customer, BasketItems }) {
            this.belongsTo(Customer);
            this.hasMany(BasketItems);
        };
    };

    Basket.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    }, {
        sequelize,
        tableName: "basket",
        modelName: "Basket",
        paranoid: true,
        underscored: true,
        defaultScope: {
            // include: ["Shop"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        }
    }
    );
    return Basket;
};