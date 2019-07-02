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
    orderAddress: {
        type: Schema.Types.ObjectId,
        ref: 'Address'
    },
    userPhone: String,
    cartItems: [cartItemSchema]
});

orderSchema.statics.getCurrentCartOfUser = function getCurrentCartOfUser(userId) {
    try {
        return this.findOne({
            userID: userId
        }, function (err, doc) {
            if (err) {
                throw err;
            }
            return doc;
        });
    } catch (err) {
        throw err;
    }
}

// const bestSeller = Order.aggregate([{
//         $unwind: "$cartItems"
//     },
//     {
//         $group: {
//             _id: "$cartItems.productID",
//             total: {
//                 $sum: "$cartItems.quantity"
//             },
//         }
//     },
//     {
//         $project: {
//             _id: 1
//         }
//     },
//     {
//         $sort: {
//             total: -1
//         }
//     },
//     {
//         $limit: 5
//     }
// ]);







const Order = mongoose.model('Order', orderSchema);

module.exports = Order