const mongoCollections = require("../config/mongoCollections");
const hobbies = mongoCollections.hobbies;
const uuid = require('node-uuid');

let exportedMethods = {
    getHobbies() {
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.find({}).toArray();
        })
    },
    getHobby(hobby) {
        return hobbies().then((hobbiesCollection) => {
            return hobbiesCollection.findOne({ 'name': hobby }).then((hobby) => {
                if (!hobby) throw "Hobby not found";
                return {information: hobby.description};
            });
        });
    },
    addhobby(name,description){
        return hobbies().then((hobbiesCollection)=>{
            let newHobby = {
                "_id": uuid.v4(),
                "name": name,
                "description": description
            };
            return hobbiesCollection.insertOne(newHobby).then((info)=>{
                console.log("new hobby added: "+ info);
                return info;
            });
        });
    }
};

module.exports = exportedMethods;