
const express = require("express");
let app = express();
let configRoutes = require("./routes");

configRoutes(app);

let server = app.listen(2000, ()=>{
    let host = server.address().address;
    let port = server.address().port;

    console.log(`server started at http://${host}:${port}`);
});


/*
        db.classes.insertOne({'code' : 'CS-513,'name' : 'Knowledge Discovery and Data Mining','Professor': 'Khasha Dehnad','Description': 'Different Data Mining and Machine Learning Techniques'})
        db.classes.insertOne({'code' : 'CS-562','name' : 'Database Management Systems 2','Professor': 'Kim Samuels','Description': 'Advance Database Systemes'})
        db.classes.insertOne({'code' : 'CS-556','name' : 'Text Minining and NLP','Professor': 'Peter Jurkat','Description': 'TM and NLP'})
        db.classes.insertOne({'code' : 'CS-546','name' : 'Web Programming','Professor': 'Phil Barresi','Description': 'NodeJS, ExpressJS, MongoDB'})
        db.classes.insertOne({'code' : 'BI-660','name' : 'Web Analytics','Professor': 'Ted Lappas','Description': 'Python, Web Scraping'})
        db.classes.insertOne({'code' : 'CS-519','name' : 'E-Commerce','Professor': 'Gene Super','Description': 'Google Ads and analytics'})


*/