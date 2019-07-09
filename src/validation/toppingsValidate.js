const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {   
    queryTopping:{
        query: Joi.object().keys({
            category: Joi.string().valid(["meat", "vegetable", "sause", "cheese"])
        }),failAction: (req,h, error) => {    
            console.log(error.details[0]);
           return error.isJoi
             ? h.response({message:error.details[0].message}).code(400).takeover()
             : h.response(error).code(500).takeover();
         }
    }
}