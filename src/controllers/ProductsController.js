const services = require('../services/productsServices');

const create =  async function(req, h){

}



const getById = async function (req, h) {
    try {
        const productID = req.params.id;
        const result = await services.getById(productID);
        return h.response(result).code(200);
    } catch (err) {
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
        throw err;
    }
}

const findBestSellerProducts = async function (req, h) {
    try {
        const result = await services.findBestSellerProducts();
        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}

module.exports = {
    create,
    getById,
    getProductsByCategory,
    findBestSellerProducts

}