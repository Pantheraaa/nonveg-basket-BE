"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require('sequelize');
require("dotenv").config();
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require("../config/db.config.json")[env]
const db = {};
config.typeCast = function (field, next) {
    // for reading from database
    if (field.type === "DATETIME") {
        return field.string();
    }
    return next();
};

config.timezone = "+5:30";

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== basename) & (file.slice(-3) === '.js');
    })
    .forEach(async function (file) {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        );
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate)
        db[modelName].associate(db);
})

db.sequelize = sequelize;

module.exports = db;