const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class UserCart extends Model {
        static associate({ User, Product }) {
            // this.belongsTo(User);
            this.belongsTo(Product);
        };
    };

    UserCart.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
    },
        {
            sequelize,
            tableName: "userCart",
            modelName: "UserCart",
            paranoid: true,
        });
    
    return UserCart;
};