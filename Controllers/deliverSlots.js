const DeliverService = require("../Services/deliverSlots");
const ApiError = require("../middlewares/apiError");
const Response = require("../middlewares/response");

const getDeliverySlots = async (req, res) => {
    try {
        const result = await DeliverService.getSlots();
        return Response.success(res, `Delivery slots found successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

const newDeliverySlot = async (req, res) => {
    const data = req.body;
    try {
        const result = await DeliverService.insertSlot(data);
        return Response.success(res, `Delivery slot added successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

const newDeliveryTiming = async (req, res) => {
    const slotId = req.params.slotId;
    const data = req.body;
    try {
        const result = await DeliverService.insertTiming(slotId, data);
        return Response.success(res, `Delivery timing added successfully.`, result);
    } catch (err) {
        if (err instanceof ApiError)
            return Response.error(res, err);

        return Response.error(res, ApiError.internal(err));
    }
}

module.exports = {
    getDeliverySlots,
    newDeliverySlot,
    newDeliveryTiming
}