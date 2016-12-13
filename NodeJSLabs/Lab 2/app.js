const fileData = require("./fileData");
const textMetrics = require("./textMetrics");

let exampleFiles = ["chapter1.txt","chapter2.txt","chapter3.txt"];

exampleFiles.forEach((file) => {
    fileData.getFileAsString(file).then(function(data){
    console.log("---------------"+file+"---------------");
    console.log(textMetrics.createMetrics(data));
    },
    function(reject){
        console.log(`${reject}`);
    });
});
