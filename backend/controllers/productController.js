const recordsPerPage = require("../config/pagination")
const Product = require("../models/ProductModel")

const getProducts = async (req, res, next) => {
    // res.send("Handling Product Routes, e.g search for products")
    try {
        const pageNum = Number(req.query.pageNum) || 1
        const totalProducts = await Product.countDocuments({})
        
        //Sort by name, rating, price
        let sort = {}
        const sortOption = req.query.sort || ""
        if(sortOption) {
            let sortOpt = sortOption.split("_")
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
            //Square brackets are required for dynamic keys in javaScript
            console.log(sort)
        }

        const products = await Product.find({}).skip(recordsPerPage * (pageNum-1)).sort(sort).limit(recordsPerPage)
        res.json({products, pageNum, paginationLinksNumber: Math.ceil(totalProducts/recordsPerPage)})
    } catch (error){
        next(error)
    } 
}
module.exports = getProducts