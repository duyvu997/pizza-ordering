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

const findProductsByCategory = async function (categoryName, numberOfProduct) {
    try {
        // console.log(numberOfProduct);
        let products = await Category.findOne({
                categoryName: categoryName
            }).populate({path:'products', options:{
                limit: numberOfProduct
            }});
        const productsData = ProductsDTO.convertReturnProductsByCategory(products); 
        return  productsData;

    } catch (err) {
        throw err
    }
}

const findBestSellerProducts =  async function(){
    try {
        const lstBestSeller = await Orders.findBestSeller();
        // console.log(lstBestSeller);
        const bestSellerData =  ProductsDTO.convertReturnBestSellerProducts(lstBestSeller);
        return bestSellerData
    } catch (err) {
        throw err;
    }
}

const findRecommend = async function(userID){
    try{
        
        const lstRecommend = await Orders.findRecommend(userID);

        // We recommend 5 product for user
        // if lstRecommend not equal 5. we recommend signature product to user.
        const numOfSignatureProducts = 5 - lstRecommend.length
        const signatureProducts = await findProductsByCategory('signature', numOfSignatureProducts);

        const result  = ProductsDTO.convertRecommendProducts(lstRecommend, signatureProducts);
        return result;

    }catch(err){
        console.log(err);
        throw err;
    }
}


module.exports = {
    getById,
    findProductsByCategory,
    findBestSellerProducts,
    findAll   ,
    findRecommend
}