const express = require("express");
const path = require("path");
const ENDPOINT = "/api/V1";
const user = require("./users.js");
const product = require("./products.js");
const category = require("./category.js");
const shop = require("./shop.js");
const customer = require("./customer.js");
const basket = require("./basketItems.js");

function routes(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(ENDPOINT + '/users', user);
    app.use(ENDPOINT + '/products', product);
    app.use(ENDPOINT + '/category', category);
    app.use(ENDPOINT + '/shop', shop);
    app.use(ENDPOINT + '/customer', customer);
    app.use(ENDPOINT + '/basket', basket);

    app.use(ENDPOINT + '/storage/uploads', express.static(path.join(__dirname, "../uploads")));
};

module.exports = routes;