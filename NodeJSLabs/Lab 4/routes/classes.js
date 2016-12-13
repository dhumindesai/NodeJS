const express = require('express');
const router = express.Router();
const data = require("../data");
const classData = data.classes;

router.get("/details", (req,res) => {
    classData.getDetails(req.query.code).then((course) => {
        res.json(course);
    }).catch((err) => {
        res.status(404).json({message: "class not found"});
    });
});

router.get("/", (req,res) => {
        classData.getAllClasses().then((classes) => {
            res.json(classes);
        });
    },() => {
        // Something went wrong with the server!
        res.status(500).send();
});

router.post("/", (req, res) => {
    // Not implemented
    res.status(501).send();
});

module.exports = router;
