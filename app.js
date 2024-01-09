const express = require("express");
const router = require('./src/Route/api');

const app = new express();
const bodyParser = require('body-parser');


//Security middlewaire......
const rateLimit = require('express-rate-limit');
const helmete = require('helmet');
const mongosenetize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const path = require('path');
const mongose = require('mongoose');

//Security middlewaire implement......

app.use(cors());
app.use(helmete());
app.use(hpp());
app.use(mongosenetize());
app.use(rateLimit());


//BodyParser

app.use(bodyParser.json())

//rate limiter

const limiter = rateLimit({windowMs:15*60*100,max:3000} );
app.use(limiter);

//Database...

let URL = "mongodb+srv://user8552:user8552@cluster0.derptwk.mongodb.net/BD-SHOPE"
//let option = {username :"user8552",password:"user8552",autoIndex:true}

mongose.connect(URL)
.then(success => console.log("DataBase is connected"))
.catch(err => console.log(err))


//Manageing Backend API Routing
app.use('/api/sales',router)

module.exports=app;
