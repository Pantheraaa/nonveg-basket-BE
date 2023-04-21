const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Category extends Model {
        static associate({ ProductCategory }) {
            this.hasMany(ProductCategory);
        };
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
            modelName: "Categories",
            underscored: true,
            timestamps: true,
            paranoid: true,
            defaultScope: {
                attributes: { exclude: ["active", "createdAt", "updatedAt", "deletedAt"] }
            }
        });

    return Category;
};