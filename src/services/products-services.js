const Model =  require('../models/product-model');

const getById = async function (productID){
    try{
        return Model.getById(productID);
    }catch(err){
        throw err;
    }

}


module.exports = {
    getById,
}