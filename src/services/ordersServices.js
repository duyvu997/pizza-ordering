const Orders = require('../models/ordersModel');
const Products = require('../models/productsModel');
const Topping = require('../models/toppingsModel');

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
        let order = await Orders.getCurrentCartOfUser(user.userID);
        let totalPrices = await     getTotalPrices(order.cartItems);
        console.log(totalPrices)



        return order;
    } catch (err) {
        throw err;
    }

}
const getTotalPrices = async function (cartItems) {
    let totalPrice = 0;
    for (item of cartItems) {

        const productCost = await calculateProductPrices(item)
        console.log(productCost);
        const toppingCost = await calculateToppingsPrices(item.toppings)
        console.log(toppingCost);

        totalPrice += productCost + toppingCost;
        // console.log(totalPrice);

    }
    return totalPrice;
}

const calculateProductPrices = async function (product) {

    const price = await Products.getPrices(product.productID, product.productSize)
    console.log(price);
    return price * product.quantity
}


const calculateToppingsPrices = async function (toppings) {
    let total = 0;
    for (topping of toppings) {
        total += await Topping.calculatePrices(topping.toppingID, topping.toppingQuantity);
    }
    return total;

}


const create = async function (accessToken, orderStatus, orderAddress, userPhone, cartItems,totalPrice) {
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
        
        let reCalculate = await getTotalPrices(order.cartItems);
        console.log(reCalculate);
        if (totalPrice != reCalculate){
            return ERROR.Code.INVALID_TOTALPRICE;
        }
        const result = await order.save()
        return result;

    } catch (err) {
        throw err;
    }
}



module.exports = {
    getLatestOrder,
    create
}