const mongoose = require("../../database");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  brand: {
    type: String,
  },
  category: {
    type: String,
  },
  tags: {
    type: Array,
  },
  countInStock: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  deliveryPrice: {
    type: Number,
  },
  price: {
    type: Number,
  },
  quantity: {
    type: Number
  },
  portion: {
    type: Number,
  },
  image: {
    type: Array,
  }
});

const Products = mongoose.model("Products", ProductSchema);

module.exports = Products;
