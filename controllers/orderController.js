import mongoose from "mongoose";

await mongoose.connect("mongodb+srv://scpepito:yTHW4UiE7G2%40gE.@cluster0.cscy5.mongodb.net/");

// create Order model with schema for order details
export const Order = mongoose.model('order', {
    transactionId: { type: String, unique: true, required: true },
    productId: { type: String, required: true },
    orderQuantity: { type: Number, required: true },
    orderStatus: { type: Number, enum: [0, 1, 2], default: 0 },
    email: { type: String, required: true },
    dateOrdered: { type: Date, default: Date.now },
    time: { type: String }
});

export const addOrder = async (req, res) => {
    try {
        const { transactionId, productId, orderQuantity, email } = req.body;
        if (!(transactionId && productId && orderQuantity && email)) {
            return res.status(400).send({ inserted: false, message: "missing required fields" });
        }
        const newOrder = new Order(req.body);
        await newOrder.save(); // save new order to DB
        res.status(201).send({ inserted: true, message: "order added successfully" });
    } catch (error) {
        res.status(500).send({ inserted: false, message: error.message }); // handle errors
    }
};

export const getOrderByTransactionId = async (req, res) => {
    // fetch order by transaction ID
    res.send(await Order.findOne({ transactionId: req.body.transactionId }));
}

// only status and quantity can be updated
export const updateOrder = async (req, res) => {
    const orderTemp = await Order.findOne({ transactionId: req.body.transactionId });
    if (!orderTemp) {
        res.send({ updated: false, message: "order not found" });
        return; // stop if order not found
    }
    
    if (req.body.orderQuantity) orderTemp.orderQuantity = req.body.orderQuantity; // update quantity
    if (req.body.orderStatus) orderTemp.orderStatus = req.body.orderStatus; // update status

    try {
        await orderTemp.save(); // save updated order
        res.send({ updated: true, message: "order updated successfully" });
    } catch (error) {
        res.status(500).send({ updated: false, message: "error updating order" }); // handle errors
    }
}

export const deleteOrder = async (req, res) => {
    // delete order by transaction ID
    res.send(await Order.deleteOne({ transactionId: req.body.transactionId }));
}

export const showAllOrderFromAUser = async (req, res) => {
    // fetch all orders for a specific user by email
    res.send(await Order.find({ email: req.body.email }));
}

export const showAllOrders = async (req, res) => {
    // fetch all orders from the database
    res.send(await Order.find({}));
}
