//!1
const systemConfig = require("../../config/system")

const dashboard = require("./dashboard.route")
const dish = require("./dish.route")
const table = require("./table.route")
const tableBooking = require("./tableBooking.router")




module.exports = (app) => {
    const PATH = systemConfig.prefixAdmin  // prefix admin

    app.use(PATH + "/dashboard", dashboard);
    app.use(PATH + "/dish", dish);
    app.use(PATH + "/table", table);
    app.use(PATH + "/tableBooking", tableBooking);
}