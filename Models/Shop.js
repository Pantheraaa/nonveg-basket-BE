const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Shop extends Model {
        static associate({ User }) {
            this.hasOne(User);
        }
    };

    Shop.init({
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
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        tableName: "shops",
        modelName: "Shop",
        paranoid: true
    }
    );
    return Shop;
}