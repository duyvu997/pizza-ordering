const Orders = require('../models/orders/ordersModel');
const OrderDTO = require('../models/orders/orders.DTO');
const Products = require('../models/products/productsModel');
const Topping = require('../models/toppings/toppingsModel');
const User = require('../models/users/usersModel');

const Producer = require('./kafka/producer');

const ERROR = require('../configuration/errorConstant');
const Constant = require('../configuration/constant')


const getAllOrders = async function (userID) {
    try {

        let order = await Orders.getHistoryOrders(userID);
        return order;
    } catch (err) {
        throw err;
    }
}

const create = async function (userID, orderStatus, orderAddress, rcvName, userPhone, cartItems, checkoutMethod, isAddressDefault, isPhoneDefault) {
    try {

        if (isAddressDefault) {
            User.updateDefaultAddress(userID, orderAddress);
        }
        if (isPhoneDefault) {
            User.updateDefaultPhone(userID, userPhone);
        }

        const order = new Orders();
        order.userID = userID;
        order.orderDate = Date.now();
        order.orderStatus = orderStatus;
        order.orderAddress = orderAddress;
        order.receiverName = rcvName;
        order.userPhone = userPhone;
        order.cartItems = cartItems;
        order.checkoutMethod = checkoutMethod;

        let TotalPrice = await calculateTotalPriceOrder(order.cartItems);
        order.totalPrice = TotalPrice;

        const OrderSaved = await order.save();
        setTimeout(function(){
            console.log('Auto changed status: submited -> processed');
            updateStatusByUser(OrderSaved._id, 'processed')
        }, 10000);

        const result = OrderDTO.convertCreateOrderReturn(OrderSaved);
        return result;

    } catch (err) {
        throw err;
    }
}

const calculateTotalPriceOrder = async function (cartItems) {
    try {

        let totalPrice = 0 + Constant.SHIP_FEE;

        for (let item of cartItems) {

            const productCost = await Products.getPrice(item.productID, item.productSize)
            // console.log(productCost);
            const toppingCost = await calculateToppingsPrices(item.toppings)
            // console.log(toppingCost);
            totalPrice += (productCost + toppingCost) * item.quantity;

        }
        return totalPrice;
    } catch (err) {
        throw err
    }

}


const calculateToppingsPrices = async function (toppings) {
    // console.log(toppings);
    let total = 0;
    for (let item of toppings) {
        let topPrice = await Topping.getPrice(item.toppingID)
        total += topPrice * item.toppingQuantity;
    }
    return total;
}


const updateOrderStatus = async function (orderID, status) {
    try {
        // console.log(orderID, status)
        const result = await Orders.findByIdAndUpdate({ _id: orderID }, { orderStatus: status }, { new: true });
      
        return result;
    } catch (err) {
        throw err;
    }
}
const updateStatusByDeliver = async function (orderID, newStatus) {
    try {
        console.log(newStatus);
        const orderDB = await Orders.findById({ _id: orderID });

        if(!orderDB){
            return ERROR.Code.PRODUCT_NOT_FOUND;
        }

        const oldStatus = orderDB.orderStatus;
        
        if ("cancelled" == oldStatus) {
            return ERROR.Code.REJECT_UPDATE;
        }
        
       return updateOrderStatus(orderID, newStatus)

    } catch (err) {
        throw err;
    }
}

const updateStatusByUser = async function (orderID, newStatus) {
    try {
        console.log(newStatus);
        const orderDB = await Orders.findById({ _id: orderID });

        if(!orderDB){
            return ERROR.Code.PRODUCT_NOT_FOUND;
        }
        const oldStatus = orderDB.orderStatus;
        
        if ("delivered" == oldStatus || "successed" == oldStatus || "cancelled" == oldStatus) {
            return ERROR.Code.REJECT_UPDATE;
        }
        if (newStatus == "processed") {
            console.log('Updated order ID: '+ orderID);
            Producer.sendOrderInfo(orderDB._id, orderDB.receiverName, orderDB.orderAddress, orderDB.userPhone, orderDB.cartItems);
            return await updateOrderStatus(orderID, newStatus);
        }
        console.log('Cancelled order ID: '+ orderID);
        return await Orders.deleteOne({ _id: orderID });

    } catch (err) {
        throw err;
    }
}

module.exports = {
    updateStatusByDeliver,
    getAllOrders,
    create,
    updateOrderStatus,
    updateStatusByUser
}