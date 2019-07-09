const services = require('../services/ordersServices');
const ERROR = require('../configuration/errorConstant');
const tokenTools = require('../middleware/auth/token/token');

const getAllOrders = async function (request, h) {
    try {

        const accessToken = request.headers.accesstoken;
        const decodedUser = await tokenTools.verifyToken(accessToken);
        // console.log(accessToken);
        // console.log(decodedUser);
        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === decodedUser) {
            return h.response({ message: ERROR.Message.InvalidToken }).code(400);
        }

        const result = await services.getAllOrders(decodedUser._id);

        return h.response(result).code(200);
    } catch (err) {
        console.log('Wrong in getCurrent Order.Controller');
        throw err;
    }
}

const create = async function (request, h) {
    try {
        const accessToken = request.headers.accesstoken;

        const decodedUser = tokenTools.verifyToken(accessToken);
        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === decodedUser) {
            return h.response({ message: ERROR.Message.InvalidToken }).code(400);
        }

        const userID           = decodedUser._id;
        const orStatus         = request.payload.orderStatus;
        const orAddress        = request.payload.orderAddress;
        const isAddressDefault = request.payload.isAddressDefault;
        const isPhoneDefault   = request.payload.isPhoneDefault
        const rcvName          = request.payload.receiverName;
        const usPhone          = request.payload.userPhone;
        const cartItems        = request.payload.cartItems;
        const checkoutMethod   = request.payload.checkoutMethod;
        console.log(checkoutMethod);

        const result = await services.create(userID, orStatus, orAddress, rcvName, usPhone, cartItems, checkoutMethod, isAddressDefault, isPhoneDefault);
        console.log(result);
        return h.response(result).code(200);

    } catch (err) {
        const errlst = err.message.split(',');
        if (errlst[0] == 'Product not found') {
            return h.response({ message: 'Product ' + errlst[1] + ' not found' }).code(400);
        }
        throw err;
    }
}

const updateOrderStatus = async function (request, h) {
    try {
        const orderID = request.params.id;
        console.log(orderID);
        const status = request.payload.status;
        console.log(status);
        const result = await services.updateStatusByUser(orderID, status);
        if (ERROR.Code.REJECT_UPDATE == result) {
            return h.response({ message: ERROR.Message.Update_Status_Failed }).code(400);
        }
        return h.response({ message: ERROR.Message.Update_Status_Success }).code(200);
    } catch (err) {
        throw err;
    }


}

module.exports = {
    create,
    getAllOrders,
    updateOrderStatus
}