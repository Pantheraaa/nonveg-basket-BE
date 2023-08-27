const db = require("../Models");
const ApiError = require("../middlewares/apiError");

class DeliverService {
    async getSlots() {
        const slots = await db.DeliverySlots.findAll({ order: [["day", "ASC"]] });
        return slots;
    };

    async insertSlot(data) {
        const newSlot = await db.DeliverySlots.create({
            day: data.day
        });
        return newSlot;
    };

    async insertTiming(slotId, data) {
        const fetchSlot = await this.findDeliverySlotById(slotId);
        if (!fetchSlot) throw ApiError.badRequest("Invalid slot id");
        const newTiming = await db.DeliveryTimings.create({
            timing: data.timing,
            delivery_slot_id: slotId
        });

        return newTiming;
    }

    async findDeliverySlotById(id) {
        const slot = await db.DeliverySlots.findByPk(id);
        return slot;
    }
};

module.exports = new DeliverService();