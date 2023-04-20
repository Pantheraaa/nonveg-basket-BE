const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Product extends Model {
        static associate({ Category, ProductCoverImage, ProductImages, ProductTags }) {
            // this.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
            // this.belongsTo(Category, { foreignKey: "categoryId", as: "category" });
            // this.hasOne(ProductCoverImage, { as: "coverImage" });
            // this.hasMany(ProductImages, { as: "images" });
            // this.hasMany(ProductTags, { as: "tags" });

            this.belongsTo(Category);
            this.hasOne(ProductCoverImage);
            this.hasMany(ProductImages);
            this.hasMany(ProductTags);
        }
    }

    Product.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
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
