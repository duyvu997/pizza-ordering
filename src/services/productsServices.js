const Products = require('../models/productsModel');
const Orders = require('../models/ordersModel');
const Category = require('../models/categoriesModel');



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


const findBestSeller =  async function(){
    try {
        const listBestSeller = await Orders.bestSeller();
        return listBestSeller
    } catch (err) {
        throw err;
    }
}
const findAll =  async function (){
    try {
        const result = await Products.find({});
        return result;
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getById,
    findProductsByCategory,
    findBestSeller,
    findAll
    
    
}