const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class CustomerAddress extends Model {
        static associate({ Customer }) {
            this.belongsTo(Customer);
        }
    };

    CustomerAddress.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cityDistrictTown: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        landMark: {
            type: DataTypes.STRING,
        },
        locality: {
            type: DataTypes.STRING,
        },
        pinCode: {
            type: DataTypes.INTEGER,
        },
        alternateMobile: {
            type: DataTypes.STRING,
        },
        isDefault: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    }, {
        sequelize,
        tableName: "customerAddress",
        modelName: "CustomerAddress",
        underscored: true,
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        }
    });

    return CustomerAddress;
}