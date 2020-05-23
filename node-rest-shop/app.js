const express = require("express");
const app = express(); // spins new express app
const morgan = require("morgan");
//tunnel all request through morgan middleware,calls next fn
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const productRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const userRoutes = require("./api/routes/user");

mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@cluster0-vjj9e.mongodb.net/test?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// handle cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-type, Authorization"
  );
  if (req.method === "OPTIONS") {
    // Before post request from browser
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/products", productRoutes); // incoming request comes through use()
app.use("/orders", orderRoutes);
app.use("/user", userRoutes); 

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    errors: {
      message: error.message,
    },
  });
});

module.exports = app;
