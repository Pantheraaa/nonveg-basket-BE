const db = require("./Models");
const app = require("./app");
require("dotenv").config();
const logger = require("./middlewares/logger.js");

const PORT = process.env.PORT || 8000;

startServer();

function startServer() {
    // { alter: true, force: false }
    db.sequelize.sync().then(() => {
        const startMessage = `Server ${process.pid} running on port ${PORT}`;
        app.listen(PORT, () => console.log(startMessage));
        logger.info(startMessage)
    })
};