"use strict";

const express = require('express');
const router = express.Router();
const userRoute =  require('../Routes/RouteUsers');
const projectRoute = require('../Routes/projects');

router.use('/user',userRoute);
//router.use('/admin/products',validateAdmin,);