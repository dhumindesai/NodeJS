const express = require('express');
const router = express.Router();
const data = require("../data");
const events = data.events;
const people = data.people;
const location = data.locations;

// Single Event Page
router.get("/:id", (req, res) => {
    // Find a event by the provided id, 
    // then display its information
    // As well as listing the names of all the attendees that will be at this event 
    // Each of these attendee names will need to link to their person page
    // You will also list the location of the event, said location's name, and a link to the location page
    // If a event is not found, display the 404 error page
    events.getEvent(parseInt(req.params.id)).then((event)=>{


        let getEventData = (event) => {
            return new Promise((resolve,reject)=>{
                let eventData = {};
                eventData.event = event;
                if(event.location){
                    location.getLocation(event.location).then((location)=>{
                        eventData.location = location;
                    });
                }; 
                if(event.attendees.length){
                    let attendees = [];
                    event.attendees.forEach((attendee)=>{
                        people.getPerson(attendee).then((person)=>{
                            attendees.push(person);
                        });
                    });
                    eventData.attendees = attendees;
                };
                return resolve(eventData);
            });
        };

        getEventData(event).then((eventData)=>{
            res.render('events/single', eventData);
        });
    },(err)=>{res.status(404).json({ error: "Event not found" });}).catch(() => {
        res.status(404).json({ error: "Event not found" });
    });

    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Event Index Page
router.get("/", (req, res) => {
    // Display a list of all events; it can be in an unordered list, or a table
    // Each of these events need to link to the single event page
    events.getAllEvents().then((eventList)=>{
        console.log(eventList);
        res.render("events/index", {events: eventList});
    });
});

module.exports = router;