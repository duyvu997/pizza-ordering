const services =  require('../services/ordersServices');
const ERROR =  require('../configuration/errorConstant');


const getLatestOrder = async function (request, h) {
    try {
        // console.log(request.headers)
        const accessToken = request.headers.authorization;
        console.log(accessToken)
        const result = await services.getLatestOrder(accessToken);
        // console.log(result);
        if (ERROR.Message.InvalidToken === result){
            return h.response(result).code(400);
        }

        return h.response(result).code(200);
    } catch (err) {
        console.log('Wrong in getCurrent Order.Controller');
        throw err;
    }
}

const create = async function (request, h) {
    try {
        const accessToken    = request.headers.accesstoken;        
        const orStatus       = request.payload.orderStatus;
        const orAddress      = request.payload.orderAddress;
        const rcvName        = request.payload.receiverName;
        const usPhone        = request.payload.userPhone;
        const cartItems      = request.payload.cartItems;       
        const checkoutMethod = request.payload.checkoutMethod;
        console.log(checkoutMethod);
        
        const result = await services.create(accessToken, orStatus, orAddress, rcvName, usPhone, cartItems, checkoutMethod);
        console.log(result);
        return h.response({message:ERROR.Message.Success, TotalPrice:result}).code(200);

    } catch (err) {
        console.log('Wrong in create Order.Controller');
        throw err;
    }
}

module.exports = {
    create,
    getLatestOrder
}