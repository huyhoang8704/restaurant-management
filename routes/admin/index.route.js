//!1
const systemConfig = require("../../config/system")

const dashboard = require("./dashboard.route")
const dish = require("./dish.route")

module.exports = (app) => {
    const PATH = systemConfig.prefixAdmin  // prefix admin

    app.use(PATH + "/dashboard", dashboard);
    app.use(PATH + "/dishes", dish);
}
