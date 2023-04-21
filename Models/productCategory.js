const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class ProductCategory extends Model {
        static associate({ Categories, Product }) {
            this.belongsTo(Categories);
            this.belongsTo(Product);
        };
    };

    ProductCategory.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
    },
        {
            sequelize,
            tableName: "productCategory",
            modelName: "ProductCategory",
            underscored: true,
            timestamps: true,
            paranoid: true,
            defaultScope: {
                include: ["Category"]
            }
        });

    return ProductCategory;
};