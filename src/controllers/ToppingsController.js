const services = require('../services/toppingsServices.js');


const getToppingsByCategory = async function (req, h) {

    try {
        let result;
        const category = req.query.category;
        // find without query
        if(!category){
            result = await services.getAll();
            return h.response(result).code(200);
        } 
        // find with query
        result = await services.findToppingsByCategory(category);
        return h.response(result).code(200);
    } catch (err) {
        throw err;
    }
}

module.exports ={ 
    getToppingsByCategory
}