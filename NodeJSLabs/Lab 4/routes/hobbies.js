const express = require('express');
const router = express.Router();
const data = require("../data");
const hobbyData = data.hobbies;

router.get("/:hobby", (req, res) => {
    hobbyData.getHobby(req.params.hobby).then((hobby) => {
        res.json(hobby);
    }).catch((error) => {
        // Not found!
        res.status(404).json({message: "hobby not found"});
    });
});

router.get("/", (req, res) => {
    hobbyData.getHobbies().then((hobbies) => {
        res.json(hobbies);
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