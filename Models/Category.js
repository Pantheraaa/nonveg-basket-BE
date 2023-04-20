const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Category extends Model {
        static associate({ Product }) {
            this.hasMany(Product);
        }
    };

    Category.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
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