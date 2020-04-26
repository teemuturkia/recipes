'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    firebase = require('./firebase/firebase'),
    app = express(),
    api = express(),
    port = 3000;

api.use(bodyParser.json({strict: false}));
app.use('/api', api);

api.get('/recipes', (req, res) => res.json(firebase.getAll()));
api.post('/recipes', (req, res) => {
    firebase.create(req.body).then(saved => {
        res.json(saved);
    }, () => {
        res.error({message: 'Save failed'});
    });
});
api.put('/recipes/:recipeId', (req, res) => {
    firebase.update(req.body, req.params.recipeId).then(saved => {
        res.json(saved);
    }, () => {
        res.error({message: 'Update failed'});
    });
});
api.delete('/recipes/:recipeId', (req, res) => {
    firebase.remove(req.params.recipeId).then(() => {
        res.json({result: 'OK'});
    }, () => {
        res.error({message: 'Delete failed'});
    });
});

app.listen(port, () => console.log(`Recipes app listening at port: ${port}`));
