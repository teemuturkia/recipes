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
    firebase.create(req.body);
    res.json({result: 'OK'});
});

app.listen(port, () => console.log(`Recipes app listening at port: ${port}`));
