const recordsPerPage = require("../config/pagination")
const Product = require("../models/ProductModel")
const imageValidate = require("../utils/imageValidate")


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
        res.json({ message: "Product removed" })
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
            message: "Product updated"
        })
    } catch (error) {
        next(error)
    }
}

const adminUpload = async (req, res, next) => {
    try {
        if(!req.files || !!req.files.images === false){
        return res.status(400).send("No files were uplaoded.")
        }

        const validateResult = imageValidate(req.files.images)
        if(validateResult.error) {
            return res.status(400).send(validateResult.error)
        }
        
        const path = require("path")
        const { v4: uuidv4 } = require("uuid")
        const uploadDirectory = path.resolve(__dirname, "../../frontend", "public", "images", "products")

        let product = await Product.findById(req.param.productId).orFail()

        let imagesTable = []

        if(Array.isArray(req.files.images)){
            imagesTable = req.files.images
        } else {
            imagesTable.push(req.files.images)
        }

        for(let image of imagesTable){
            var fileName = uuidv4() + path.extname(image.name)
            var uploadPath = uploadDirectory + "/" + fileName

            product.images.push({path: "/images/products/" + fileName})
            
            image.mv(uploadPath, function(err){
                if(err){
                    return res.status(500).send(err)
                }
            })
        }
        await product.save()
        return res.send("Files uploaded!")
    } catch (error) {
        next(error)
    }
}

const adminDeleteProductImage = async (req, res, next) => {
    try{
        const imagePath = decodeURIComponent(req.params.imagePath)

        const path = require("path")
        const finalPath = path.resolve("../frontend/public") + imagePath

        const fs = require("fs")
        fs.unlink(finalPath, (err) => {
            if(err){
                res.status(500).send(err)
            }
        })
        await Product.findOneAndUpdate({_id: req.params.productId}, { $pull: { images: {path: imagePath } } }).orFail()
        return res.end()

    } catch (err){
        next(err)
    }  
}

module.exports = {getProducts, getProductById, getBestsellers, adminGetProducts, adminDeleteProduct, adminCreateProduct, adminUpdateProduct, adminUpload, adminDeleteProductImage }