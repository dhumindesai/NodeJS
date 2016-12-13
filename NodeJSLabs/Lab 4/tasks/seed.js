const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const classes = data.classes;
const education = data.education;
const hobbies = data.hobbies;


dbConnection().then((db) => {
    return db.dropDatabase().then(()=>{
        return dbConnection;
    }).then((db) => {
         return education.addEducation("Bai Ava Bai High School","High School");
        })
        .then((info)=>{
            return education.addEducation("Babaria Institute of Technology","Undergrad")
        })
        .then((info)=>{
            return education.addEducation("Stevens Institute of Technology","Graduate")
        })
        .then((info)=>{
            return classes.addClass("CS-546","Web Programming","Phil Baressi","MongoDb, Node.js, Javascript");
        })
        .then((info)=>{
            return classes.addClass("CS-546","Web Programming","Phil Baressi","MongoDb, Node.js, Javascript");
        })
        .then((info)=>{
            return classes.addClass("CS-513","Data Mining","Khasha Dehnad","R programming");
        })
        .then((info)=>{
            return classes.addClass("CS-519","E-commerce","Gene Super","Google Analytics");
        })
        .then((info)=>{
            return classes.addClass("CS-562","Database Systems 2","Kim Samuels","SQL");
        })
        .then((info)=>{
            return classes.addClass("CS-549","Computer Architecture","Ed Banduk","Assembly");
        })
        .then((info)=>{
            return classes.addClass("CS-555","Text Mining","P Jarkat","SAS");
        })
        .then((info)=>{
             return hobbies.addhobby("Cricket","I play Cricket every weekend");
        })
        .then((info)=>{
        console.log("Done Seeding Database.");
        db.close();
        })
        .catch((err) => {
            console.log(err);
        });
},(error)=>{
    console.error(error);
});