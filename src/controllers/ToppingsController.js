const services = require('../services/toppingsServices.js');

const getAll = async function (req, h){
    try{
        console.log('top controller');
        const result = await services.getAll();
        console.log(result);
        return h.response(result).code(200);
    }catch(err){
        throw err;
    }
}

module.exports ={
    getAll
}