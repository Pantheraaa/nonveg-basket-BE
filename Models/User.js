const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class User extends Model {
        static associate({ UserCart }) {
            this.hasMany(UserCart);
        };
    };

    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        mobile: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
        },
        // address: {
        //     type: DataTypes.STRING,
        // },
        // city: {
        //     type: DataTypes.STRING,
        // },
        // district: {
        //     type: DataTypes.STRING,
        // },
        // state: {
        //     type: DataTypes.STRING,
        // },
        // country: {
        //     type: DataTypes.STRING,
        // },
        // zipCode: {
        //     type: DataTypes.INTEGER,
        // },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    }, {
        sequelize,
        tableName: "users",
        modelName: "User",
        paranoid: true
    }
    );
    return User;
}