const Products = require('../models/product-model');

const Category = require('../models/category');
const findProducts = async (cateName) => {
    try {
        let products = await Category.findOne({
                categoryName: cateName
            }).populate('products');
            return  products;

    } catch (err) {
        throw err
    }
}

const getById = async function (productID) {
    try {
        const product = await Products.getById(productID);
        return product;
    } catch (err) {
        throw err;
    }
}

const findProductsByCategory = async function (categoryName) {
    try {
        const result = await findProducts(categoryName);
        console.log(result);
        return result;

    } catch (err) {
        throw err;
    }
}

module.exports = {
    getById,
    findProductsByCategory
}