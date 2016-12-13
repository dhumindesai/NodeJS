
const connection = require("./mongoConnection").todoitems;
const todoitems = require("./todo");



let createdTask1 = todoitems.createTask("Ponder Dinosaurs", "Has Anyone Really Been Far Even as Decided to Use Even Go Want to do Look More Like?");

let createdTask2 = todoitems.createTask("Play Pokemon with Twitch TV", "Should we revive Helix?");

let task1Id = "";
let task2Id = "";

createdTask1.then((newTask) => {
    console.log(newTask);
    task1Id = newTask._id;
    return createdTask2;
}).then((newTask) => {
    console.log(newTask);
    task2Id = newTask._id;
    return todoitems.getAllTasks();
}).then((allTasks)=> {
    console.log(allTasks);
    return todoitems.removeTask(task1Id);
}).then(() => {
    return todoitems.getAllTasks(); 
}).then((allTasks) => {
    console.log(allTasks);
    return todoitems.completeTask(task2Id);
}).then(() => {
    return todoitems.getTask(task2Id);
}).then((newTask) => {
    console.log(newTask);
}).catch((err) => {
    console.log(err);
});


/*
todoitems.getTask("026e0c50-8895-11e6-8e9d-2f85accf3774").then((data) => {
    console.log(data);
},
(err) => {
    console.log(err);
});
*/

/*
let taskPromise = todoitems.getTask("3d9edf00-8897-11e6-83bf-530c31d7b2c8");

let finishedTask = taskPromise.then((task) => {  
    //console.log("Finished "task._id);  
    return todoitems.completeTask(task._id);    
},
(err) => {
    console.log(err);
});

finishedTask.then((task) => {
    console.log(task);
});
*/

/*
todoitems.removeTask("026e0c50-8895-11e6-8e9d-2f85accf3774").then((result) => {

},
(err) => {
    console.log(err)
});
*/

/*
todoitems().then((data) => {
   data.add(function(err,result){
       if(err) throw err;
       let me = result;
   }); 
});

*/

/*
let addMe = (name) => {
        if (!name) 
            return Promise.reject("You must provide a name");
        
        return todoitems().then((nameCollection) => {
            let newMe = {
                name: name
            };

            return nameCollection
                .insertOne(newMe)
                .then((newInsertInformation) => {
                    return newInsertInformation.insertedId;
                });
        });
    }
*/

/*
addMe("Danny").then((id)=>{
    console.log(id);
});
console.log("Finish");
*/

/*
todoitems().then((collection)=>{
    collection.find().count().then((document) => {
        console.log(document);
    });
});
*/