const Joi = require('@hapi/joi');
const myCustomJoi = Joi.extend(require('joi-phone-number'));
Joi.objectId = require('joi-objectid')(Joi);



module.exports = {
    create: {
        headers: Joi.object().keys({
            accesstoken: Joi.string().required()
        }).unknown(),
        payload: Joi.object().keys({
            isAddressDefault: Joi.boolean().optional(),
            isPhoneDefault: Joi.boolean().optional(),
            orderStatus: Joi.string().valid(["submitted", "processed","cancelled"]).required(),
            orderAddress: Joi.string().required(),
            checkoutMethod:Joi.string(),
            receiverName: Joi.string(),
            userPhone: myCustomJoi.string().length(10).phoneNumber({
                defaultCountry: 'VN',
                format: 'national'
            }).required(),
            cartItems: Joi.array().items(Joi.object().keys({
                productID: Joi.objectId(),
                productSize: Joi.string().valid( ["22","30","38"]),
                quantity: Joi.number(),
                crustType: Joi.string().valid(["thin", "classic", "cheese"]),
                toppings: Joi.array().items( Joi.object().keys({
                    toppingID: Joi.objectId(),
                    toppingQuantity: Joi.number()
                }))
            })).required()

        }), failAction: (req,h, error) => {    
             console.log(error.details[0]);
            return error.isJoi
              ? h.response({message:error.details[0].message}).code(400).takeover()
              : h.response(error).code(500).takeover();
          }
    },
    getAllOrders :{
        headers: Joi.object().keys({
            accesstoken: Joi.string().required()
        }).unknown(),failAction: (req,h, error) => {    
            console.log(error.details[0]);
           return error.isJoi
             ? h.response({message:error.details[0].message}).code(400).takeover()
             : h.response(error).code(500).takeover();
         }
    },
    updateStatusOrder :{
        payload: Joi.object().keys( {
            status: Joi.string().valid(['processed', 'cancelled']).required()
        }),failAction: (req,h, error) => {    
            console.log(error.details[0]);
           return error.isJoi
             ? h.response({message:error.details[0].message}).code(400).takeover()
             : h.response(error).code(500).takeover();
         }
    }
}