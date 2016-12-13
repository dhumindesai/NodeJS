
const express = require("express");
let app = express();
let configRoutes = require("./routes");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
configRoutes(app);

//recipesData.getAllRecipes();


let server = app.listen(2000, ()=>{
    let host = server.address().address;
    let port = server.address().port;

    console.log(`server started at http://${host}:${port}`);
});

