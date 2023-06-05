const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class Customer extends Model {
        static associate({ Basket }) {
            this.hasOne(Basket);
        };
    };

    Customer.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue:""
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
            // defaultValue:"",
            unique: true
        },
        pin: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    }, {
        sequelize,
        tableName: "customers",
        modelName: "Customer",
        paranoid: true,
        underscored: true,
        timestamps: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        }
    }
    );
    return Customer;
};