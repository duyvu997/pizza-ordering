const services = require('../services/productsServices');
const mongoose = require('mongoose');
const ERROR =  require('../configuration/errorConstant');

const getById = async function (req, h) {
    try {
        const productID = req.params.id;
        if(!mongoose.Types.ObjectId.isValid(productID)){
            obj ={statusCode: ERROR.Code.INVALID, message: ERROR.Message.InvalidObjectID}
            return h.response(obj);
        }
        
        const result = await services.getById(productID);
        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}

const getListByCategory = async function (req, h) {

    try {
        const category = req.query.categories;    
        const result = await services.findProductsByCategory(category);
        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}

const findBestSellerProducts =  async function(req, h){
    try{
        const result = await services.findBestSeller();
        return h.response(result).code(200);
    }catch(err){
        throw err;
    }
}

module.exports = {
    getById,
    getListByCategory,
    findBestSellerProducts

}