const services = require('../services/productsServices');
const tokenTools = require('../middleware/auth/token/token');
const ERROR = require('../configuration/errorConstant');
const ProductDTO =  require('../models/products/products.DTO');

const create =  async function(req, h){

}



const getById = async function (req, h) {
    try {
        const productID = req.params.id;
        const result = await services.getById(productID);
        return h.response(result).code(200);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const getProductsByCategory = async function (req, h) {
    try {
        let result;
        const category = req.query.category;
        if (!category) {
            result = await services.findAll();
            return h.response(result).code(200);
        }
        result = await services.findProductsByCategory(category);
        return h.response(result).code(200);
    } catch (err) {
        console.log(err);
        throw err;
    }
}

const findBestSellerProducts = async function (req, h) {
    try {
        const result = await services.findBestSellerProducts();
        return h.response(result).code(200);
    } catch (err) {
        console.log(err);
        throw err;
    }
}
const findRecommendProducts = async function (req, h) {
    try {
        const accessToken  = req.headers.accesstoken;
        // console.log(accessToken);
        let result;

        if (!accessToken){
            result = await services.findProductsByCategory("signature",5);
            // console.log(result);
            const data = ProductDTO.convertSignatureProductsToRecommend(result);
            return h.response(data).code(200);
        }

        const decodedUser = tokenTools.verifyToken(accessToken);
        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === decodedUser) {
            return h.response({ message: ERROR.Message.Invalid_Token }).code(400);
        }

        result = await services.findRecommend(decodedUser._id);
        return h.response(result).code(200);
        
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    create,
    getById,
    getProductsByCategory,
    findBestSellerProducts,
    findRecommendProducts

}