
const mongoCollections = require("../config/mongoCollections");
const recipes = mongoCollections.recipes;
const uuid = require('node-uuid');

// function to add a new class in the classes collection
module.exports.getAllRecipes = () => {
  return recipes().then((recipeCollection) => {
    return recipeCollection.find({},{'title': 1}).toArray();
  });
}

// function to add a new class in the classes collection
module.exports.getRecipeById = (id) => {
  return recipes().then((recipeCollection) => {
      return recipeCollection.findOne({ _id: id }).then((recipe) => {
          if (!recipe) throw "recipe not found";
          return recipe;
      });
  });
}

// function to add a new class in the classes collection
module.exports.addRecipe = (title, ingredients, steps) => {
  return recipes().then((recipeCollection) => {
      let newRecipe = {
          _id: uuid.v4(),
          title: title,
          ingredients: ingredients,
          steps: steps,
          comments: []
      };
      return recipeCollection.insertOne(newRecipe).then((newInsertInformation) => {
          return newInsertInformation.insertedId;
      }).then((newId) => {
          return this.getRecipeById(newId);
      });
  });
}

module.exports.updateRecipe = (id, updatedRecipe) => {
  return recipes().then((recipeCollection) => {
      let updatedRecipeData = {};

      if (updatedRecipe.title) {
          updatedRecipeData.title = updatedRecipe.title
      }
      if (updatedRecipe.ingredients) {
          updatedRecipeData.ingredients = updatedRecipe.ingredients
      }
      if (updatedRecipe.steps) {
          updatedRecipeData.steps = updatedRecipe.steps
      }

      let updateCommand = { 
          $set: updatedRecipeData
      };

      return recipeCollection.updateOne({ _id: id }, updateCommand).then(() => {
          return this.getRecipeById(id);
      });
  });
}

module.exports.removeRecipe = (id) => {
  return recipes().then((recipeCollection) => {
      return recipeCollection.removeOne({ _id: id }).then((deletionInfo) => {
          if (deletionInfo.deletedCount === 0) {
              throw (`Could not delete recipe with id of ${id}`)
          }
      });
  });
}