const formRoutes = require("./form");

const constructorMethod = (app) => {
    app.use("/", formRoutes);

    app.use("*", (req, res) => {
        res.redirect("/clientform");
    })
};

module.exports = constructorMethod;