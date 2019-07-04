const Joi = require('@hapi/joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
Joi.objectId = require('joi-objectid')(Joi);



module.exports = {
    create: {
        headers: Joi.object().keys({
            authorization: Joi.string().required()
        }).unknown(),
        payload: Joi.object().keys({
            totalPrice:Joi.number().required(),
            orderStatus: Joi.string().required(),
            orderAddress: Joi.string().required(),
            checkoutMethod:Joi.string().required(),
            userPhone: myCustomJoi.string().phoneNumber({
                defaultCountry: 'VN',
                format: 'national'
            }).required(),
            cartItems: Joi.array().items(Joi.object().keys({
                productID: Joi.objectId(),
                productSize: Joi.string(),
                quantity: Joi.number(),
                crustType: Joi.string(),
                toppings: Joi.array().items( Joi.object().keys({
                    toppingID: Joi.objectId(),
                    toppingQuantity: Joi.number()
                }))
            })).required()

        })
    },
    getCurrent :{
        headers: Joi.object().keys({
            authorization: Joi.string().required()
        }),
    }
}