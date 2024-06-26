const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductImages extends Model {
        static associate({ Product }) {
            this.belongsTo(Product);
            // this.hasOne(Product, { foreignKey: "id", as: "productId" });
        };
    };

    ProductImages.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        // productId: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        image: {
            type: DataTypes.STRING,
        },
    },
        {
            sequelize,
            modelName: "ProductImages",
            tableName: "productImages",
            paranoid: true,
            timestamps: true,
        });

    return ProductImages;
};