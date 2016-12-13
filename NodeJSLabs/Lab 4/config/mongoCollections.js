const dbConnection = require("./mongoConnection");

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
let getCollectionFn = (collection) => {
    let _col = undefined;

    return () => {
        if (!_col) {
            //console.log("Inside the collections");
                _col = dbConnection().then(db => {
                return db.collection(collection);
            });
        }
        //console.log(_col);
        return _col;
    }
}

/* Now, you can list your collections here: */
module.exports = {
    education: getCollectionFn("education"),
    hobbies: getCollectionFn("hobbies"),
    classes: getCollectionFn("classes")
};
