const services =  require('../services/products-services');


const getListByCategory = function () {

}
const getById = function (req, h) {
    try{
        const productID =  req.params.id;
        const result =  services.getById(productID);
        return h.response(result).code(200);
    }catch(err){
        return h.response(err).code(500);
    }
}






module.exports = {
    getListByCategory,
    getById
}