//!1
const systemConfig = require("../../config/system")
const authenticateToken = require('../../middlewares/authUser.middleware')

const dashboard = require("./dashboard.route")
const dish = require("./dish.route")
const table = require("./table.route")
const tableBooking = require("./tableBooking.router")
const account = require("./account.route")





module.exports = (app) => {
    const PATH = systemConfig.prefixAdmin  // prefix admin

    app.use(authenticateToken)
    app.use(PATH + "/dashboard", dashboard);
    app.use(PATH + "/dish", dish);
    app.use(PATH + "/table", table);
    app.use(PATH + "/tableBooking", tableBooking);
    app.use(PATH + "/accounts", account);

}