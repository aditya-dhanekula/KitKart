const Product = require("../models/ProductModel")

const getProducts = (req, res) => {
    // Product.create({name: "Panasonic"})
    res.send("Handling Product Routes, e.g search for products")
}
module.exports = getProducts