// import modules

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');

var app = express();

const route = require('./routes/route');

// connect to mongoDB
mongoose.connect('mongodb://localhost:27017');

// on connection
mongoose.connection.on('connected', () => {
    console.log(`connected to database mongodb @  27017`);
});

mongoose.connection.on('error', (err) => {
    if (err) {
        console.log(`Error in database connection ${err}`);
    }
});

// port number
const port = 3000;

// adding middleware
app.use(cors());
app.use(bodyParser.json());

// static files
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/api', route);

// testing server 
app.get('/', (req, res) => {
    res.send('foobar');
})

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});