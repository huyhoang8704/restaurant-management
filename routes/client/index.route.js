const userRoute = require('./user.route')
const homeRoute = require('./home.route')

module.exports = (app) => {
    // const PATHversion1 = "/api/v1"

    app.use("/", homeRoute)

    app.use("/users",userRoute);
}
