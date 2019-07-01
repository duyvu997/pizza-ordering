const Orders = require('../models/ordersModel');
const tokenTools = require('../middleware/auth/token/token');
const ERROR = require('../configuration/errorConstant');
const moment = require('moment');

const getLatestOrder = async function (accessToken) {
    try {
        const user = tokenTools.verifyToken(accessToken);
        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === user) {

            const message = ERROR.Message.InvalidToken;

            return message;
            // return message and error code
        }
        return await Orders.getCurrentCartOfUser(user.userID)
    } catch (err) {
        throw err;
    }

}

const create = async function (accessToken, orderStatus, orderAddress, userPhone, cartItems) {
    try {
        const user = tokenTools.verifyToken(accessToken);
        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === user) {

            const obj = {
                statusCode: ERROR.Code.FAILD_TO_VERIFY_TOKEN,
                message: ERROR.Message.InvalidToken
            }
            return obj;
            // return message and error code
        }
        const order = new Orders();
        order.userID = user.userID;
        order.orderDate = Date.now();
        order.orderStatus = orderStatus;
        order.orderAddress = orderAddress;
        order.userPhone = userPhone;
        order.cartItems = cartItems

        const result = await order.save();
        return result;

    } catch (err) {
        throw err;
    }
}



module.exports = {
    getLatestOrder,
    create
}