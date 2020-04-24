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

getAll = () => {
    return recipes;
};

create = (recipe) => {
    const newRecipeRef = ref.push();
    newRecipeRef.set(recipe);
};

module.exports = {
    getAll,
    create
};
