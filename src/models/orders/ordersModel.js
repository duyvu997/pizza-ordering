const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let cartItemSchema = new Schema({
    _id: false,
    productID: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    productSize: String,
    toppings: [{
        _id: false,
        toppingID: {
            type: Schema.Types.ObjectId,
            ref: 'Topping'
        },
        toppingQuantity: Number
    }],
    quantity: Number,
    crustType: String
});

let orderSchema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    orderDate: Schema.Types.Date,
    orderStatus: String,
    orderAddress: String,
    checkoutMethod:String,
    receiverName:String,
    userPhone: String,
    cartItems: [cartItemSchema],
    totalPrice: Number
});

orderSchema.statics.getHistoryOrders =async function getAllOrdersOfUser(userId) {
    try {
        const result = await this.find({
            userID: userId
        }).sort( {orderDate:-1});
        return result;
    } catch (err) {
        throw err;
    }
}

orderSchema.statics.findBestSeller = async function findBestSeller ()  {
    const result = await Order.aggregate([
        {
            $unwind: "$cartItems"
        },
        {
            $group: {
                _id: "$cartItems.productID",
                total: {
                    $sum: "$cartItems.quantity"
                }
            }
        },
        {
            $sort: {
                total: -1
            }
        },
        {
            $limit: 5
        }, 
        {
            $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "product"
            }
        },  
        {
            $unwind: "$product"
        },
        {
            $project: {
                "product":1 ,
                "_id": 0
            }
        }
    ])
    
    return result;
}

const Order = mongoose.model('Order', orderSchema);
module.exports = Order




