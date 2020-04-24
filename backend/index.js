'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    recipeService = require('./recipe-service'),
    app = express(),
    api = express(),
    port = 3000;

api.use(bodyParser.json({strict: false}));
app.use('/api', api);

api.get('/recipes', (req, res) => res.json(recipeService.getAll()));
api.post('/recipes', (req, res) => {
    recipeService.create(req.body);
    res.send('OK');
});

app.listen(port, () => console.log(`Recipes app listening at port: ${port}`));
