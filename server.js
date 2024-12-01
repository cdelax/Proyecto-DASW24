"use strict";

const express = require('express');
const router = require('./app/controllers/router');
const app = express();

const port = 3001;

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log(`Proyecto  listening on port ${port}!`);
});