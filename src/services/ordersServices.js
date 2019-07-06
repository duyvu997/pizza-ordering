const Orders = require('../models/ordersModel');
const Products = require('../models/productsModel');
const Topping = require('../models/toppingsModel');

const tokenTools = require('../middleware/auth/token/token');
const ERROR = require('../configuration/errorConstant');
const Constant = require('../configuration/constant')


const getLatestOrder = async function (accessToken) {
    try {

        const user = tokenTools.verifyToken(accessToken);
        console.log(user);
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
    let totalPrice = 0 + Constant.SHIP_FEE;
    for (item of cartItems) {

        // const productCost = await getPrices(item)
        const productCost = await Products.getPrices(item.productID, item.productSize)
        // console.log(productCost);
        const toppingCost = await calculateToppingsPrices(item.toppings)
        // console.log(toppingCost);

        totalPrice += (productCost + toppingCost) * item.quantity;
        // console.log(item.quantity);

    }
    return totalPrice;
}
const calculateToppingsPrices = async function (toppings) {
    // console.log(toppings);
    let total = 0;
    for (topping of toppings) {
        total += await Topping.calculatePrices(topping.toppingID, topping.toppingQuantity);
    }
    return total;
}

const create = async function (accessToken, orderStatus, orderAddress, rcvName, userPhone, cartItems, checkoutMethod) {
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
        order.receiverName = rcvName;
        order.userPhone = userPhone;
        order.cartItems = cartItems;
        order.checkoutMethod = checkoutMethod;

        let TotalPrice = await getTotalPrices(order.cartItems);
      
        const result = await order.save()
        
        return TotalPrice;

    } catch (err) {
        throw err;
    }
}



module.exports = {
    getLatestOrder,
    create
}