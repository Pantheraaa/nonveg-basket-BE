const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Category extends Model {
        static associate({ Product }) {
            this.hasMany(Product, { as: "product" });
        }
    };

    Category.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        }
    },
        {
            sequelize,
            tableName: "categories",
            modelName: "Category",
            underscored: true,
            timestamps: true,
            paranoid: true,
        });

    return Category;
};