'use strict';

const express = require('express');
const expressHandlebars = require('express-handlebars');

const routes = require('./views/data/routes.json');
const guidelinesRoutes = require('./views/data/guidelinesRoutes.json');
const guidelinesContents = require('./views/data/guidelinesContents.json');
const helpers = require('./views/lib/helpers');

const app = express();

const handlebarsEngine = expressHandlebars.create({
    extname: ".hbs",
    helpers,
    defaultLayout: 'main',
    partialsDir: [
        'views/partials/'
    ]
});

app.use(express.static('public'));
app.engine('.hbs', handlebarsEngine.engine);
app.set('view engine', '.hbs');

app.get('/guidelines', (req, res) => {
    res.render('guidelines', {
        routes,
        title: 'Guidelines',
        currentPage: '/guidelines',
        guidelinesContents,
        guidelinesRoutes
    });
});

app.get('/', (req, res) => {
    res.redirect('/guidelines');
});


app.get('*', (req, res) => {
    res.render('wip', {
        routes,
        title: req.path.toUpperCase().replace('/', ''),
        currentPage: req.path
    });
});

app.listen(3000, () => {
    console.log('express-handlebars example server listening on: 3000');
});