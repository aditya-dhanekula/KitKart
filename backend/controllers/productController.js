const recordsPerPage = require("../config/pagination")
const Product = require("../models/ProductModel")
const Review = require("../models/ReviewModel")

const getProducts = async (req, res, next) => {
    // res.send("Handling Product Routes, e.g search for products")
    try {
        let query = {}
        let queryCondition = false

        let priceQueryCondition = {}
        if(req.query.price){
            queryCondition = true
            priceQueryCondition = { price: { $lte: Number(req.query.price) } }
        }

        let ratingQueryCondition = {}
        if(req.query.rating){
            queryCondition = true
            ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } }
        }

        let categoryQueryCondition = {}
        
        const categoryName = req.params.categoryName || ""
        if(categoryName){
            queryCondition = true
            let a = categoryName.replaceAll(",", "/")
            var regEx = new RegExp("^" + a)
            categoryQueryCondition = { category: regEx }
        }
        
        if(req.query.category){
            queryCondition = true
            let a = req.query.category.split(",").map((item) => {
                if(item) {
                    return new RegExp("^" + item)
                }
            })
            categoryQueryCondition = {
                category: { $in: a }
            }
        }

        let attrsQueryCondition = []
        if(req.query.attrs){
            //attrs=RAM-1 TB-2 TB-4 TB,color-blue-red
            //['RAM-1 TB-4 TB', 'color-blue', '']
            attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
                if(item){
                    let a = item.split("-") //['RAM', '1 TB', '4 TB']
                    let values = [...a]
                    values.shift() //removes first item
                    let a1 = {
                        attrs: { $elemMatch: { key: a[0], value: { $in: values} } }
                    }
                    acc.push(a1)
                    // console.dir(acc, { depth: null })
                    return acc
                } else {
                    return acc
                }
            }, [])
            // console.dir(attrsQueryCondition, {depth: null})
            queryCondition = true
        }

        //pagination
        const pageNum = Number(req.query.pageNum) || 1
        
        //Sort by name, rating, price
        let sort = {}
        const sortOption = req.query.sort || ""
        if(sortOption) {
            let sortOpt = sortOption.split("_")
            sort = { [sortOpt[0]]: Number(sortOpt[1]) }
            //Square brackets are required for dynamic keys in javaScript
            console.log(sort)
        }

        const searchQuery = req.params.searchQuery || ""
        let searchQueryCondition = {}
        let select = {}
        if(searchQuery) {
            queryCondition = true
            searchQueryCondition = { $text: { $search: searchQuery }}
            select = {
                score: { $meta: "textScore" }
            }
            sort = { score: { $meta: "textScore" } }
        }

        if(queryCondition){
            query = {
                $and: [priceQueryCondition, ratingQueryCondition, categoryQueryCondition, searchQueryCondition, ...attrsQueryCondition]
                //...attrsQueryCondition iterates over all objects within that array and each condition is ANDed with the previous query conditions.
            }
        }

        const totalProducts = await Product.countDocuments(query)
        const products = await Product.find(query).select(select).skip(recordsPerPage * (pageNum-1)).sort(sort).limit(recordsPerPage)
        res.json({products, pageNum, paginationLinksNumber: Math.ceil(totalProducts/recordsPerPage)})
    } catch (error){
        next(error)
    } 
}

const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).populate("reviews").orFail()
        // populate method will retrieve all the data corresponding to reviews as the reviews are currently being referenced by their ids.
        res.json(product)
    } catch (error) {
        next(error)
    }
}

const getBestsellers = async (req, res, next) => {
    try {
        const products = await Product.aggregate([
            // category - asc and sales - desc
            { $sort: { category: 1, sales: -1} },
            { $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } } },
            { $replaceWith: "$doc_with_max_sales" },
            { $match: { sales: { $gt: 0 } } },
            { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
            { $limit: 3 }
        ])
        res.json(products)
    } catch (error) {
        next(error)
    }
}

const adminGetProducts = async (req, res, next) => {
    try {
        const products = await Product.find({}).sort({category: 1}).select("name price category")
        res.json(products)
    } catch(error){
        next(error)
    }
}

const adminDeleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail()
        await product.remove()
        res.json( { message: "product removed" })
    } catch(err) {
        next(err)
    }
}

const adminCreateProduct = async (req, res, next) => {
    try {
        const product = new Product()
        const { name, description, count, price, category, attributesTable } = req.body
        product.name = name
        product.description = description
        product.count = count
        product.price = price
        product.category = category
        if( attributesTable.length > 0 ){
            attributesTable.map( (item) => {
                product.attrs.push(item)
            } )
        }
        await product.save()
        
        res.json({
            message: "product created",
            productId: product._id
        })

    } catch (err) {
        next(err)
    }
}

const adminUpdateProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id).orFail()
        const { name, description, count, price, category, attributesTable } = req.body
        product.name = name || product.name
        product.description = description || product.description
        product.count = count || product.count
        product.price = price || product.price
        product.category = category || product.category
        if(attributesTable.length > 0){
            product.attrs = []
            attributesTable.map((item) => {
                product.attrs.push(item)
            })
        } else {
            product.attrs = []
        }
        await product.save()
        res.json({
            message: "Product Updated"
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {getProducts, getProductById, getBestsellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct }