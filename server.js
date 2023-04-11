const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // import cors package

const app = express();
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// enable cors
app.use(cors());

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to the backend project"});
});

// Require categories routes
require('./app/routes/category.routes.js')(app);

// Require products routes
require('./app/routes/product.routes.js')(app);

// listen for requests
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
