
const educationRoutes = require("./education");
const hobyRoutes = require("./hobbies");
const classRoutes = require("./classes");

const constructorMethod = (app) => {
    app.use("/education", educationRoutes);
    app.use("/hobbies", hobyRoutes);
    app.use("/classes", classRoutes);

    app.use("*", (req, res) => {
        res.status(404).json({error: "Not found"});
    });
};

module.exports = constructorMethod;