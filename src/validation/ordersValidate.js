const Joi = require('@hapi/joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
Joi.objectId = require('joi-objectid')(Joi);



module.exports = {
    create: {
        headers: Joi.object().keys({
            accesstoken: Joi.string().required()
        }).unknown(),
        payload: Joi.object().keys({
            orderStatus: Joi.string().valid(["submitted", "cancelled"]).required(),
            orderAddress: Joi.string().required(),
            checkoutMethod:Joi.string(),
            receiverName: Joi.string(),
            userPhone: myCustomJoi.string().phoneNumber({
                defaultCountry: 'VN',
                format: 'national'
            }).required().min(10).max(10),
            cartItems: Joi.array().items(Joi.object().keys({
                productID: Joi.objectId(),
                productSize: Joi.string(),
                quantity: Joi.number(),
                crustType: Joi.string().valid(["thin", "classic", "cheese"]),
                toppings: Joi.array().items( Joi.object().keys({
                    toppingID: Joi.objectId(),
                    toppingQuantity: Joi.number()
                }))
            })).required()

        }), failAction: (req,h, error) => {     
            return error.isJoi
              ? h.response({message:error.details[0].message}).code(400).takeover()
              : h.response(error).code(500).takeover();
          }
    },
    getCurrent :{
        headers: Joi.object().keys({
            authorization: Joi.string().required()
        }),
    }
}