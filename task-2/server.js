'use strict';

const express = require('express');
const expressHandlebars = require('express-handlebars');

const feeds = require('./views/data/feed.json');

const app = express();

const handlebarsEngine = expressHandlebars.create({
    extname: ".hbs",
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
});

app.use(express.static('public'));
app.engine('.hbs', handlebarsEngine.engine);
app.set('view engine', '.hbs');

app.get('/', (req, res) => {
    res.render('index', {
        feeds
    });
});

app.listen(3000, () => {
    console.log('express-handlebars example server listening on: 3000');
});