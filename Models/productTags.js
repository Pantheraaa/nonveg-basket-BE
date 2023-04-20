const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductTags extends Model {
        static associate({ Product }) {
            this.belongsTo(Product);
        }
    };

    ProductTags.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
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