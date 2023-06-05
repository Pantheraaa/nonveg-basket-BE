const express = require("express");
const ENDPOINT = "/api/V1";
const user = require("./users.js");
const product = require("./products.js");
const category = require("./category.js");
const cart = require("./userCart.js");
const path = require("path");
const shop = require("./shop.js");
const customer = require("./customer.js");

function routes(app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(ENDPOINT + '/users', user);
    app.use(ENDPOINT + '/products', product);
    app.use(ENDPOINT + '/category', category);
    app.use(ENDPOINT + '/cart', cart);
    app.use(ENDPOINT + '/shop', shop);
    app.use(ENDPOINT + '/customer', customer);

    app.use(ENDPOINT + '/storage/uploads', express.static(path.join(__dirname, "../uploads")));
};

module.exports = routes;