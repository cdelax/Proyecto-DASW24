"use strict";

const express = require('express');
const session = require('express-session');
const router = require('./app/controllers/router');
const app = express();

const port = 3001;

app.use(express.json());

app.use(session({
    secret: 'clave',
    resave: false,
    saveUninitialized: false
}));

app.use(router);

app.listen(port, () => {
    console.log(`Proyecto  listening on port ${port}!`);
});