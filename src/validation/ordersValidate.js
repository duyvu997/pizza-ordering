const Joi = require('@hapi/joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
Joi.objectId = require('joi-objectid')(Joi);



module.exports = {
    create: {
        payload: Joi.object().keys({
            orderStatus: Joi.string(),
            orderAddress: Joi.objectId(),
            userPhone: myCustomJoi.string().phoneNumber({
                defaultCountry: 'VN',
                format: 'national'
            }),
            cartItems: Joi.array().items(Joi.object().keys({
                productID: Joi.objectId(),
                size: Joi.string(),
                quantity: Joi.string(),
                crustType: Joi.string(),
                topping: Joi.array().items( Joi.object().keys({
                    toppingID: Joi.objectId(),
                    toppingQuantity: Joi.number()
                }))
            }))

        })
    },
}