const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Product extends Model {
        static associate({Category, ProductCoverImage}) {
            this.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
            // this.hasOne(ProductCoverImage, { foreignKey: "productId" });
        }
    }

    Product.init({
        // id: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        //     // defaultValue: uuid,
        //     primaryKey: true,
        //     // required: true,
        // },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // categoryId: {
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // },
        quantityPerUnit: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sellPrice: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        weight: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        }
    },
        {
            sequelize,
            tableName: "products",
            modelName: "Product",
            underscored: true,
            timestamps: true,
            paranoid: true,
            underscored: true,
        });
    return Product;
}
