
const express = require('express');
const router = express.Router();
const data = require("../data");
const recipesData = data.recipes;

router.get("/", (req, res) => {
    recipesData.getAllRecipes().then((recipeList) => {
        res.json(recipeList);
    }, () => {
        // Something went wrong with the server!
        res.sendStatus(500);
    });
});

router.get("/:id", (req, res) => {
    recipesData.getRecipeById(req.params.id).then((recipe) => {
        res.json(recipe);
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

router.post("/", (req, res) => {
    let recipeInfo = req.body;

    if (!recipeInfo) {
        res.status(404).json({ error: "You must provide some data" });
        return;
    }

    if (!recipeInfo.title) {
        res.status(400).json({ error: "You must provide a title" });
        return;
    }

    if (!recipeInfo.ingredients) {
        res.status(400).json({ error: "You must provide the ingredients" });
        return;
    }

    if (!recipeInfo.steps) {
        res.status(400).json({ error: "You must provide the steps" });
        return;
    }

    recipesData.addRecipe(recipeInfo.title, recipeInfo.ingredients, recipeInfo.steps)
        .then((newRecipe) => {
            res.json(newRecipe);
        }, (err) => {
            res.sendStatus(500);
        });
});

router.put("/:id", (req, res) => {
    let recipeInfo = req.body;

    if (!recipeInfo) {
        res.status(400).json({ error: "You must provide data to create a recipe" });
        return;
    }

    updateRecipeItems = Object.keys(recipeInfo);
    updateRecipeItems.forEach((item) => {
        if (item != 'title' && item != 'ingredients' && item != 'steps') {
            res.status(400).json({ error: `Invalid update item requested : ${item}` });
            return;
        }
    });

    let getRecipe = recipesData.getRecipeById(req.params.id).then(() => {
        return recipesData.updateRecipe(req.params.id, recipeInfo)
            .then((updatedRecipe) => {
                res.json(updatedRecipe);
            }, () => {
                res.sendStatus(500);
            });
    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

router.delete("/:id", (req, res) => {
    let recipe = recipesData.getRecipeById(req.params.id).then(() => {
        return recipesData.removeRecipe(req.params.id)
            .then(() => {
                res.sendStatus(200);
            }).catch(() => {
                res.sendStatus(500);
            });

    }).catch(() => {
        res.status(404).json({ error: "Recipe not found" });
    });
});

module.exports = router;
