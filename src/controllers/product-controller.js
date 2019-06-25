const services = require('../services/products-services');

const getById = async function (req, h) {
    try {
        const productID = req.params.id;

        const result = await services.getById(productID);
        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}

const getListByCategory = async function (req, h) {

    try {
        const cateName = req.params.categoryName;
        console.log(cateName)
        const result = await services.findProductsByCategory(cateName);
       
        return h.response(result).code(200);

    } catch (err) {
        throw err
    }
}

module.exports = {
    getById,
    getListByCategory

}