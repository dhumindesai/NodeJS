const express = require('express');
const router = express.Router();
const data = require("../data");
const insertString = data.insertString;

router.get("/clientform", (req, res) => {
    res.render("form/static", {});
});

router.get("/serverform", (req, res) => {
    res.render("form/server", {});
});

router.post("/serverform", (req, res) => {
    let text = (req.body.txt);
    let str = (req.body.str);
    let counts = parseInt(req.body.counts);
    let index = parseInt(req.body.index);
    let result;

    try {
           result = insertString.getResult(text,str,counts,index);
        }
    catch (e) {
        res.render("form/server", { text: text, str: str, counts: counts, index: index, error: e });
        return;
    }

    res.render("form/server", { text: text, str: str, counts: counts, index: index, result: result });
});

module.exports = router;