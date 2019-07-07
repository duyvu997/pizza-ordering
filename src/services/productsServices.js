const Products = require('../models/products/productsModel');
const ProductsDTO =  require('../models/products/products.DTO');
const Orders = require('../models/orders/ordersModel');
const Category = require('../models/categories/categoriesModel');

const findAll =  async function (){
    try {
        const result = await Products.find({});
        return result;
    } catch (err) {
        throw err;
    }
}

const getById = async function (productID) {
    try {
        return product = await Products.getById(productID);         
    } catch (err) {
        throw err;
    }
}

const findProductsByCategory = async function (categoryName) {
    try {
        let products = await Category.findOne({
                categoryName: categoryName
            }).populate('products');
        const productsData = ProductsDTO.convertReturnProductsByCategory(products); 
        return  productsData;

    } catch (err) {
        throw err
    }
}

const findBestSellerProducts =  async function(){
    try {
        const lstBestSeller = await Orders.bestSeller();
        console.log(lstBestSeller);
        const bestSellerData =  ProductsDTO.convertReturnBestSellerProducts(lstBestSeller);
        return bestSellerData
    } catch (err) {
        throw err;
    }
}

module.exports = {
    getById,
    findProductsByCategory,
    findBestSellerProducts,
    findAll   
}