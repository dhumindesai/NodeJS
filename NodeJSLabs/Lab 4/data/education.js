const mongoCollections = require("../config/mongoCollections");
const education = mongoCollections.education;
const uuid = require('node-uuid');

let exportedMethods = {
    getEducation() {
        return education().then((educationCollection) => {
            return educationCollection.find({}).toArray();
        })
    },
    getHighschool() {
        return education().then((educationCollection) => {
            return educationCollection.findOne({ 'level': 'High School' }).then((education) => {
                if (!education) throw "HighSchool not found";
                return {information: education.school};
            });
        });
    },
    getUndergrad() {
        return education().then((educationCollection) => {
            return educationCollection.findOne({ 'level': 'Undergrad' }).then((education) => {
                if (!education) throw "HighSchool not found";
                return {information: education.school};
            });
        });
    },
    addEducation(school,level){
        return education().then((educationCollection) => {
            let education = {
                '_id': uuid.v4(),
                'school': school,
                'level' : level
            };
            return educationCollection.insertOne(education).then((info)=>{
                console.log("new education added: "+info);
                return info;
            });
        });
    }
};

module.exports = exportedMethods;