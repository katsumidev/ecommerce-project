const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Products = require("../models/product");
const mongo = require("mongoose");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.use(authMiddleware);

router.post("/addToCart", (req, res) => {
  const { quantity, productId } = req.body;

  User.find({ _id: req.userId }, (err, arr) => {
    let duplicate = false;

    arr.forEach((items) => {
      items.cart.forEach((cartInfo) => {
        if (cartInfo.id === productId) {
          duplicate = true;
          var outOfStock;

          Products.findOne({ _id: productId }, (err, product) => {
            if (cartInfo.quantity >= product.countInStock) {
              outOfStock = true;
            }
          });

          console.log(outOfStock);
        }
      });
    });

    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.userId, "cart.id": productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, arr) => {
          if (err) {
            return res.status(200).send(err);
          }
          res.status(200).send(arr.cart);
        }
      );
    } else {
      User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: {
            cart: {
              id: productId,
              quantity: quantity,
            },
          },
        },
        { new: true },
        (err, arr) => {
          if (err) {
            return res.status(200).send(err);
          }
          res.status(200).json(arr.cart);
        }
      );
    }
  });
});

router.get("/consultTheCart", (req, res) => {
  User.find({ _id: req.userId }, (err, arr) => {
    arr.forEach((items) => {
      cart = items.cart;

      let array = cart.map((item) => {
        return item.id;
      });

      Products.find({ _id: { $in: array } }).exec((err, product) => {
        if (err) return res.status(400).send(err);
        return res.status(200).json({ product, cart });
      });
    });
  });
});

router.get("/removeFromCart", (req, res) => {
  User.find({ _id: req.userId }, (err, arr) => {
    arr.forEach((items) => {
      User.findOneAndUpdate(
        { _id: req.userId },
        {
          $pull: { cart: { id: req.query.id } },
        },
        { new: true },
        (err, arr) => {
          let cart = items.cart;
          let array = cart.map((item) => {
            return item.id;
          });

          Products.find({ _id: { $in: array } }).exec((err, cartDetail) => {
            if (err) return res.status(400).send(err);
            return res.status(200).json({
              cartDetail,
              cart,
            });
          });
        }
      );
    });
  });
});

module.exports = (app) => app.use("/cart", router);
