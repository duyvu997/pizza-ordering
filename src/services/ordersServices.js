const Orders = require('../models/orders/ordersModel');
const OrderDTO = require('../models/orders/orders.DTO');
const Products = require('../models/products/productsModel');
const Topping = require('../models/toppings/toppingsModel');
const User = require('../models/users/usersModel');

const tokenTools = require('../middleware/auth/token/token');
const ERROR = require('../configuration/errorConstant');
const Constant = require('../configuration/constant')


const getAllOrders = async function (accessToken) {
    try {

        const user = tokenTools.verifyToken(accessToken);
        
        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === user) {
            return ERROR.Message.InvalidToken;          
        }

        let order = await Orders.getCurrentCartOfUser(user.userID);
        
        // console.log(totalPrices)

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


const create = async function (accessToken, orderStatus, orderAddress, rcvName, userPhone, cartItems, checkoutMethod,isAddressDefault, isPhoneDefault) {
    try {


        const user = tokenTools.verifyToken(accessToken);
        console.log(user);

        if (ERROR.Code.FAILD_TO_VERIFY_TOKEN === user) {

            const obj = {
                statusCode: ERROR.Code.FAILD_TO_VERIFY_TOKEN,
                message: ERROR.Message.InvalidToken
            }
            return obj;
            // return message and error code
        }

        if(isAddressDefault){
            User.updateDefaultAddress(user.userID, orderAddress);
        }
        if(isPhoneDefault){
            User.updateDefaultPhone(user.userID, userPhone);
        }




        const order          = new Orders();
        order.userID         = user.userID;
        order.orderDate      = Date.now();
        order.orderStatus    = orderStatus;
        order.orderAddress   = orderAddress;
        order.receiverName   = rcvName;
        order.userPhone      = userPhone;
        order.cartItems      = cartItems;
        order.checkoutMethod = checkoutMethod;

        let TotalPrice       = await getTotalPrices(order.cartItems);
        order.totalPrice     = TotalPrice;
      
        const OrderSaved     = await order.save();
        const result         = OrderDTO.convertCreateOrderReturn(OrderSaved);
        return result;

    } catch (err) {
        throw err;
    }
}


const updateOrderStatus = async function (orderID, status){
    try{
        // console.log(orderID, status)
        const result =  await Orders.findByIdAndUpdate({_id:orderID}, {orderStatus: status},{new:true});
        // console.log(result)
        return result;
    }catch(err){
        throw err;
    }

}


module.exports = {
    getAllOrders,
    create,
    updateOrderStatus
}