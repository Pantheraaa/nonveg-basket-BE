const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductCoverImage extends Model { 
        // static associate({ Product }) {
        //     this.hasOne(Product, { foreignKey: "productId" });
        // }
    };

    ProductCoverImage.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        productId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        coverImage: {
            type: DataTypes.STRING,
        },
    },
        {
            sequelize,
            modelName: "ProductCoverImage",
            tableName: "productCoverImage",
            paranoid: true,
            timestamps: true,
        });

    return ProductCoverImage;
};