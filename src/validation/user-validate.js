const Joi = require('@hapi/joi');

module.exports = {
    register: {
        payload: Joi.object().keys({
            userName: Joi.string().min(3).max(50).required(),
            userEmail: Joi.string().email().min(3).max(50).required(),
            userPassword: Joi.string().min(8).max(128).required()
        })
    },
    
}