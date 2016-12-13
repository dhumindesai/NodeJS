const mongoCollections = require("../config/mongoCollections");
const classes = mongoCollections.classes;
const uuid = require('node-uuid');

let exportedMethods = {
    getAllClasses() {
        return classes().then((classesCollection) => {
            return classesCollection.find({}).toArray();
        })
    },
    getDetails(code) {
        return classes().then((classesCollection) => {
            return classesCollection.findOne({ code: code }).then((Class) => {
                if (!Class) throw "Class not found";
                return {information: Class};
            });
        });
    },
    addClass(code,name,professor,description){
        return classes().then((classesCollection)=>{
            let newClass = {
                "_id": uuid.v4(),
                "code": code,
                "name": name,
                "professor": professor,
                "description": description
            };
            return classesCollection.insertOne(newClass).then((info)=>{
                console.log("new class added: "+ info);
                return info;
            });
        });
    }
};

module.exports = exportedMethods;