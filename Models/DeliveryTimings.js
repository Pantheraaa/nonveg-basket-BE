const { Model } = require("sequelize");

module.exports = function (sequelize, DataTypes) {
    class DeliveryTimings extends Model {
        static associate({ DeliverySlots }) {
            this.belongsTo(DeliverySlots, { foreignKey: "delivery_slot_id", as: "deliverySlot" });
        }
    };

    DeliveryTimings.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        timing: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: "deliveryTimings",
        modelName: "DeliveryTimings",
        underscored: true,
        paranoid: true,
        defaultScope: {
            attributes: { exclude: ["createdAt", "updatedAt", "deletedAt"] }
        }
    });

    return DeliveryTimings;
}