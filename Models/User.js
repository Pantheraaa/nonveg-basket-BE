const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class User extends Model {
        static associate({ Shop }) {
            this.belongsTo(Shop);
        };
    };

    User.init({
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
        userType: {
            type: DataTypes.ENUM,
            values: ["Super admin", "Admin"],
            defaultValue: "Admin"
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
        paranoid: true,
        defaultScope: {
            include: ["Shop"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt", "password", "ShopId"] }
        }
    }
    );
    return User;
}