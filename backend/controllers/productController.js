const recordsPerPage = require("../config/pagination")
const Product = require("../models/ProductModel")

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
            console.dir(attrsQueryCondition, {depth: null})
            queryCondition = true
        }

        if(queryCondition){
            query = {
                $and: [priceQueryCondition, ratingQueryCondition, categoryQueryCondition, ...attrsQueryCondition]
                //...attrsQueryCondition iterates over all objects within that array and each condition is ANDed with the previous query conditions.
            }
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
        const totalProducts = await Product.countDocuments(query)
        const products = await Product.find(query).skip(recordsPerPage * (pageNum-1)).sort(sort).limit(recordsPerPage)
        res.json({products, pageNum, paginationLinksNumber: Math.ceil(totalProducts/recordsPerPage)})
    } catch (error){
        next(error)
    } 
}
module.exports = getProducts