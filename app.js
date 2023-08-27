const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Routes");

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    methods: ['GET', 'POST', "PATCH", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.options('*', cors());
app.use(cors(corsOptions));

// Initializing routes:
router(app);

module.exports = app;