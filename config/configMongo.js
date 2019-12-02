const mongoose = require('mongoose');
const logger = require('./logger')

var db = mongoose.connect("mongodb://localhost:27017/db", {
    useNewUrlParser: true
})
mongoose.connection.on("connected", () => {
    logger.info("Successfully connected to the database");
})
mongoose.connection.on("disconnected", () => {
    logger.info('Could not connect to the database ');
    process.exit();
})
mongoose.connection.on("error", () => {
    logger.info('error while connecting to the database ');
    process.exit(1);
})
module.exports = db