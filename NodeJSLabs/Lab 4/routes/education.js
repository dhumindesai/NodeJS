const express = require('express');
const router = express.Router();
const data = require("../data");
const educationData = data.education;

router.get("/highschool", (req, res) => {
    educationData.getHighschool().then((highschool) => {
        res.json(highschool);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "highschool not found"});
    });
});

router.get("/undergrad", (req, res) => {
    educationData.getUndergrad().then((undergrad) => {
        res.json(undergrad);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "undergrad school not found"});
    });
});

router.get("/", (req, res) => {
    educationData.getEducation().then((education) => {
        res.json(education);
    }, () => {
        // Something went wrong with the server!
        res.status(500).send();
    });
});

router.post("/", (req, res) => {
    // Not implemented
    res.status(501).send();
});

module.exports = router;