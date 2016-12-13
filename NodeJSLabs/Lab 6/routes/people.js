const express = require('express');
const router = express.Router();
const data = require("../data");
const people = data.people;
const events = data.events;

// Single Person Page
router.get("/:id", (req, res) => {
    // Find a person by the provided id, 
    // then display their information
    // As well as listing all events that they will be attending
    // Each of these events need to link to the event page, and show the event name
    // If a person is not found, display the 404 error page
    let eventData = {};
    events.getEventsForAttendee(parseInt(req.params.id)).then((allEvents)=>{
        eventData = allEvents;
        people.getPerson(parseInt(req.params.id)).then((person)=>{
            res.render('people/single', { person: person, events:eventData });
        },(err)=>{res.status(404).json({ error: "Person not found" });});
    })
   .catch(() => {
        res.status(404).json({ error: "Person not found" });
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// People Index Page
router.get("/", (req, res) => {
    // Display a list of all people; it can be in an unordered list, or a table
    // Each of these people need to link to the single person page
    people.getAllPeople().then((peopleList)=>{
        res.render("people/index", {people: peopleList});
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;