const express = require('express');
const router = express.Router();
const data = require("../data");
const locations = data.locations;
const events = data.events;

// Single Location Page
router.get("/:id", (req, res) => {
    // Find a location by the provided id, 
    // then display its information
    // As well as listing all events that will be at this location
    // Each of these events need to link to the event page and show the event name
    // If a location is not found, display the 404 error page
    let eventsData = {};
    events.getAllEvents().then((allEvents) => {
        eventsData = allEvents.filter(x => x.location == req.params.id);
        locations.getLocation(parseInt(req.params.id)).then((location)=>{
            res.render('locations/single', { location: location, events: eventsData});
        },(err)=>{res.status(404).json({ error: "Location not found" });});
    },(err)=>{console.log(err)})
    .catch(() => {
        res.status(404).json({ error: "Location not found" });
    });
   // res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

// Location Index Page
router.get("/", (req, res) => {
    // Display a list of all locations; it can be in an unordered list, or a table
    // Each of these locations need to link to the single location page
     locations.getAllLocations().then((locationsList)=>{
        res.render("locations/index", {locations: locationsList});
    });
    //res.render("misc/debug", { debug: true, modelData: { something: "SomeValue" } });
});

module.exports = router;