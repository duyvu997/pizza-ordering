const services =  require('../services/ordersServices');
const ERROR =  require('../configuration/errorConstant');


const getLatestOrder = async function (request, h) {
    try {

        const accessToken = request.headers.accesstoken;
        
        const result = await services.getLatestOrder(accessToken);

        if (ERROR.Message.InvalidToken === result){
            return h.response(result).code(400);
        }

        return h.response(result).code(200);
    } catch (err) {
        console.log('Wrong in getCurrent Cart.Controller');
        throw err;
    }
}

const create = async function (request, h) {
    try {
        const accessToken = request.headers.accesstoken;        
        const orStatus    = request.payload.orderStatus;
        const orAddress   = request.payload.orderAddress;
        const usPhone     = request.payload.userPhone;
        const cartItems   = request.payload.cartItems;

        
        const result = await services.create(accessToken,orStatus,orAddress,usPhone, cartItems);
        
        return h.response(result).code(200);

    } catch (err) {
        throw err;
    }
}

module.exports = {
    create,
    getLatestOrder
}