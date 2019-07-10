const Joi = require('@hapi/joi');
const ERROR = require('../configuration/errorConstant')

module.exports = {
    register: {
        payload: Joi.object().keys({
            userName: Joi.string().min(3).max(50).required(),
            userEmail: Joi.string().email().min(3).max(50).required(),
            userPassword: Joi.string().min(8).max(128).required()
        }),failAction: (req,h, error) => {    
            console.log(error.details[0]);
           return error.isJoi
             ? h.response({statusCode: ERROR.Code.VALIDATE_FAILED,message:error.details[0].message}).code(400).takeover()
             : h.response(error).code(500).takeover();
         }
    },
    login:{
        payload: Joi.object().keys({
            userEmail: Joi.string().email().min(3).max(50).required(),
            userPassword: Joi.string().min(8).max(128).required()
        }),failAction: (req,h, error) => {    
            console.log(error.details[0]);
           return error.isJoi
             ? h.response({statusCode: ERROR.Code.VALIDATE_FAILED, message:error.details[0].message}).code(400).takeover()
             : h.response(error).code(500).takeover();
         }
    },
    update: {
        payload: Joi.object().keys({
            userName: Joi.string().min(3).max(50).optional(),            
            userPassword: Joi.string().min(8).max(128).optional(),
            userAddress: Joi.string().min(3).max(50).optional(),
            userPhone: Joi.string().min(3).max(50).optional(),
            
        }),failAction: (req,h, error) => {    
            console.log(error.details[0]);
           return error.isJoi
             ? h.response({statusCode: ERROR.Code.VALIDATE_FAILED,message:error.details[0].message}).code(400).takeover()
             : h.response(error).code(500).takeover();
         }
    },
    
}