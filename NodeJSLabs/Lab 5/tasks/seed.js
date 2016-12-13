const dbConnection = require('../config/mongoConnection');
const data = require('../data');
const comments = data.comments;
const recipes = data.recipes;

dbConnection().then((db) => {
    return db.dropDatabase().then(()=>{
        return dbConnection;
    }).then((db) => {
         return recipes.addRecipe("Fried Eggs",[
                    {
                    "name": "Egg",
                    "amount": "2 eggs"
                    },
                    {
                    "name": "Olive Oil",
                    "amount": "2 tbsp"
                    },
                ],[
            "First, heat a non-stick pan on medium-high until hot",
            "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
            "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
            "Gently pour the egg from the bowl onto the oil",    
            "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
            "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
            "Remove from oil and plate",
            "Repeat for second egg"
  ]);
        })
        .then((recipe)=>{
            return comments.addCommentByRecipeId(recipe._id,{
            poster: "Gordan Ramsay",
            comment: "These eggs are delicious!" 
            })
            .then(()=>{
                return comments.addCommentByRecipeId(recipe._id,{
                poster: "Jon Snow",
                comment: "Amazing Recipe. Well Done!" 
            })
            });
        })
        .then(()=>{
            return recipes.addRecipe("Fried Chicken",[
                    {
                    "name": "Chicken",
                    "amount": "2 nums"
                    },
                    {
                    "name": "Veg Oil",
                    "amount": "4 tbsp"
                    },
                ],[
            "First, heat a non-stick pan on medium-high until hot",
            "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
            "Add Chicken pieces",
            "Fry it and serve it"
            ]);
        })
        .then((recipe)=>{
            return comments.addCommentByRecipeId(recipe._id,{
            poster: "Ned Stark",
            comment: "Winter is coming. I liked Chicken!" 
            })
            .then(()=>{
                return comments.addCommentByRecipeId(recipe._id,{
                poster: "Tyrion Lannister",
                comment: "Drink wine and eat Chicken!" 
                });
            });
        })
        .then((info)=>{
        console.log("Done Seeding Database.");
        db.close();
        })
        .catch((err) => {
            console.log(err);
        });
},(error)=>{
    console.error(error);
});