// Importing required modules
const cors = require('cors');
const express = require('express');
//const https = require('https');
//const fs = require('fs');

// parse env variables
require('dotenv').config();

require("./helpers/db/mongodb.js")();

// Configuring port
const port = process.env.PORT || 9000;

const app = express();

// Configure middlewares
app.use(cors());
app.use(express.json());

app.set('view engine', 'html');

// Static folder
app.use(express.static(__dirname + '/views/'));

// Defining route middleware
app.use('/api', require('./routes/api'));

// Listening to port
//https.createServer({
//    key: fs.readFileSync('./ssl/certificate.pem'),
//    cert: fs.readFileSync('./ssl/private.pem'),
//}, app).listen(port);
app.listen(port);
console.log(`Listening On http://localhost:${port}/api`);

module.exports = app;
