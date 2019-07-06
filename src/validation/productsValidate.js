const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
    gettById: {
        params: Joi.object().keys({
            id: Joi.objectId()
        })
    },
    queryProduct:{
        query: Joi.object().keys({
            category: Joi.string().valid(["classic", "premium", "signature"])
        })
    }
}