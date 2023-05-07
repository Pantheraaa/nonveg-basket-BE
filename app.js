const express = require("express");
const app = express();
// const corsOptions = require("./config/cors.js");
const cors = require("cors");
const userRouter = require("./Routes/users.js");
const productRouter = require("./Routes/products.js");
const categoryRouter = require("./Routes/category.js");
const cartRouter = require("./Routes/userCart.js");
const shopRouter = require("./Routes/shop.js");

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', "PATCH", "PUT", "DELETE"], // Replace with the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Replace with the allowed headers
};

app.options('*', cors());
app.use(cors(corsOptions));
app.use(express.json());

// app.use("/api/v1/users", (req, res, next) => {
//     console.log(req.body); // Log the parsed JSON data
//     next();
// }, userRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/shop", shopRouter);

module.exports = app;