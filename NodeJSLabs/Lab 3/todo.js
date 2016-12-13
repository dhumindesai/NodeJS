
const mongoCollections = require("./mongoCollections");
const todoitems = mongoCollections.todoitems;
const uuid = require('node-uuid');

let exportedMethods = {
     getTask(id) {
       if(!id) return Promise.reject("you must provide an ID to search for");

       return todoitems().then((todoitemsCollection) => {
           return todoitemsCollection.findOne({_id:id}).then((result) => {
               if(!result) return Promise.reject("There is no task with this Id");
               return result;
           });
       });
    },

    createTask(title, description){
        if(!title) return Promise.reject("You must provide a title");
        if(typeof title != "string") return Promise.reject("Title should be in string");
        if(!description) return Promise.reject("You must provide a description");
        if(typeof description != "string") return Promise.reject("description should be in string");

        return todoitems().then((todoitemsCollection) => {
            let newTask = {
                _id: uuid.v1(),
                title: title,
                description: description,
                completed: false,
                completedAt: null
            };

            return todoitemsCollection.insertOne(newTask).then((newInsertInformation) => {
                 return newInsertInformation.insertedId;
            }).then((insertedId) => {
                return this.getTask(insertedId);
            });
        });
    },

    getAllTasks(){
        return todoitems().then((todoitemsCollection) => {
            return todoitemsCollection.find().toArray().then((allTaskData) => {
                 return allTaskData;
            });
        });
    },
    
    completeTask(taskId){
        if(!taskId) return Promise.reject("You must provide the taskId");
        
        return todoitems().then((todoitemsCollection) => {
           return this.getTask(taskId).then((currentTask) => {
               let finishedTask = {
                _id: taskId,
                title: currentTask.title,
                description: currentTask.description,
                completed: true,
                completedAt: getDateTime()
               };

               return todoitemsCollection.updateOne({_id: taskId}, finishedTask).then((result)=>{
                   return this.getTask(taskId);
               });
           });
        });
    },

    removeTask(id){
        if(!id) return Promise.reject("You must provide the taskId");

        return todoitems().then((todoitemsCollection) => {
            return todoitemsCollection.removeOne({ _id: id }).then((removeInfo) => {
                console.log(removeInfo.deletedCount);
                if(removeInfo.deletedCount === 0) return Promise.reject("Could not delete task because TaskId is not correct");
            },
            (err) => {
                console.log(err);
            });
        });
    }
};

function getDateTime() {
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
     return dateTime;
}

module.exports = exportedMethods;

