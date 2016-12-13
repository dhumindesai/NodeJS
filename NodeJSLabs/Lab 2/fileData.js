
let fileData = exports = module.exports;
const fs = require('fs');

fileData.getFileAsString = (path) =>{
    return new Promise(function(resolve,reject){
        if(!path) return reject("No path has been given."); // if path is not given, it returns reject promise

        fs.readFile(path, 'UTF-8', function(err, data){
            if(err) return reject(err);
            return resolve(data);
        });
    });
        
};


fileData.getFileAsJSON = (path) => {
    return new Promise(function(resolve, reject){
        if(!path) return reject("No path has been given."); // if path or object is not given, it returns reject promise

            fs.readFile(path, 'UTF-8', function(err, data){ 
            if(err) return reject(err); //if error occurs in reading files reject callbacks is thrown along with an error

            try{
                JSON.parse(data);
            }
            catch(e){
                return reject(e);   // throws an error if parsing fails
            }
        
            return resolve(JSON.parse(data));
        });    
    });
}


fileData.saveStringToFile = (path, text) => {
    return new Promise(function(resolve,reject){
        if((!path) || (!text)) return reject("No path has been given."); 

        fs.writeFile(path,text, function(err,data){
            if(err) return reject(err);
            
            return resolve(true);
        });
    });
}



fileData.saveJSONToFile = (path, obj) => {
    return new Promise(function(resolve,reject){
        if((!path) || (!obj)) return reject("No path or object has been given."); 

        try{
            obj = JSON.stringify(obj,null,4);
        }catch(e){
            return reject(e);
        }

        fs.writeFile(path,obj, function(err,data){
            if(err) return reject(err);
            return resolve(true);
        });
    });
};


