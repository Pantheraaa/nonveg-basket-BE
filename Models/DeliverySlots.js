const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class DeliverySlots extends Model {
        static associate({ DeliveryTimings }) {
            this.hasMany(DeliveryTimings);
        }
    };

    DeliverySlots.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        day: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "deliverySlots",
        modelName: "DeliverySlots",
        underscored: true,
        paranoid: true,
        defaultScope: {
            include: ["DeliveryTimings"],
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        }
    });

    return DeliverySlots;
}