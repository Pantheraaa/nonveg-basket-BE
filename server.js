const db = require("./Models");
const basketItems = require("./Services/basketItems");
const app = require("./app");
require("dotenv").config();
const logger = require("./middlewares/logger.js");

const PORT = process.env.PORT || 8000;

startServer();

function startServer() {
    // { alter: true, force: true }
    // db.sequelize.sync({ alter: true, force: true }).then(() => {
    // { alter: true }
    db.sequelize.sync({ alter: true, force: false }).then(() => {
        const startMessage = `Server ${process.pid} running on port ${PORT}`;
        app.listen(PORT, () => console.log(startMessage));
        logger.info(startMessage)
    })
};