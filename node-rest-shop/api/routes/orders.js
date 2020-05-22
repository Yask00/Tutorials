const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("./models/order");
const Product = require("./models/product");

router.get("/", (req, res, next) => {
  Order.find()
    .select("product quantity _id")
    .populate("product", "name")
    .exec()
    .then((docs) => {
      res.status(200).json({
        count: docs.length,
        orders: docs.map((doc) => {
          return {
            _id: doc._id,
            product: doc.product,
            quantity: doc.quantity,
            request: {
              type: "GET",
              url: "http://localhost:3000/orders/" + doc._id,
            },
          };
        }),
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        res.status(404).json({ message: "Prodcut not found" });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        product: req.body.productId,
        quantity: req.body.quantity,
      });
      return order.save();
    })
    .then((result) => {
      res.status(201).json({
        message: "Order stored",
        // can include order info
        //   request...
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })

    .catch((err) => {
      res.status(500).json({ message: "Product not found" });
    });
});

router.get("/:orderId", (req, res, next) => {
  Order.findById(req.params.orderId)
    .populate("product")

    .exec()
    .then((order) => {
      if (!order) {
        res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({
        order: order,
        // request...
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.delete("/:orderId", (req, res, next) => {
  // TODO: second remove of the same already removed is 200
  Order.remove({ _id: req.params.orderId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Order deleteed",
        // request...
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

module.exports = router;
