const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductTags extends Model { };

    // Association here:

    ProductTags.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tag: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: "ProductTags",
        tableName: "productTags",
    });

    return ProductTags;
};