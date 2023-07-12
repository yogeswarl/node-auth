// Desc: Main entry point for the application
// MongoDB connection requirement
require('./config/db.js');

const express = require('express');
const bodyParser = express.json;
const cors = require('cors');
const path = require('path');
const routes = require('./routes')
// create express app
const app = express();

app.use(cors())
app.use(bodyParser());
app.use('/api', routes);
// export module for use in index.js
module.exports = app;