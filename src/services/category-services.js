
const Boom = require('@hapi/boom');
const ERROR =  require('../config/error-code');
const Category = require('../models/category');
const findProducts = async (cateName) => {
    try {
        await Category.findOne({categoryName:cateName})
        .populate('products')
        .exec(function  (err, productsWithCategory){
            if (err){
                throw err;
            }
            if (!productsWithCategory){
                
                return "somtheing"       ;       
            }
            console.log(productsWithCategory)
            return productsWithCategory

        })  

    }catch(err){
        throw err
    }
}

module.exports ={
    findProducts
}