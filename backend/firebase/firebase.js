'use strict';

const admin = require("firebase-admin");
/* Generate credentials-file in Firebase console */
const serviceAccount = require("./credentials");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: serviceAccount.databaseURL
});

const db = admin.database();
const ref = db.ref("recipes");
let recipes = [];

ref.on("value", (snapshot) => {
    const val = snapshot.val();
    recipes = val ? val : [];
}, (errorObject) => {
    console.log("The read failed: " + errorObject.code);
});

const getAll = () => {
    return recipes;
};

const create = (recipe) => {
    const newRecipeRef = ref.push();
    const recipeId = newRecipeRef.key;
    return newRecipeRef.set(recipe).then(() => {
        recipe.id = recipeId;
        return recipe;
    });
};

const update = (recipe, recipeId) => {
    delete recipe.id;
    return ref.child(recipeId).set(recipe).then(() => {
        recipe.id = recipeId;
        return recipe;
    });
}

const remove = (recipeId) => {
    return ref.child(recipeId).remove();
};

module.exports = {
    getAll,
    create,
    update,
    remove
};
