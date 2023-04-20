const express = require("express");
const app = express();
const cors = require("./config/cors.js");
const userRouter = require("./Routes/users.js");
const productRouter = require("./Routes/products.js");
const categoryRouter = require("./Routes/category.js");

app.use(express.json());

app.use(cors);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/category", categoryRouter);

module.exports = app;