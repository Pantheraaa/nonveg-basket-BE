const express = require("express");
const app = express();
// const corsOptions = require("./config/cors.js");
const cors = require("cors");
const router = require("./Routes");

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', "PATCH", "PUT", "DELETE"], // Replace with the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Replace with the allowed headers
};

app.options('*', cors());
app.use(cors(corsOptions));

// Initializing routes:
router(app);

module.exports = app;