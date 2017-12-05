const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// setup express app
const app = express();

mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

//middlewares
app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', routes);
app.use((err, req, res, next) => {
    // console.log(err);
    res.status(422).send({error: err.message});
});


app.listen(process.env.port || 4000, () => {
    console.log(`app listening on port 4000`);
});
