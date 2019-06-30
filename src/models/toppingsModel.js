const mongoose = require('mongoose'),
Schema  =  mongoose.Schema;

let toppingSchema =  new Schema({
    toppingID =  Schema.Types.ObjectId,
    toppingName =  String,
    toppingPrices = Number
});

const Topping = mongoose.model('Topping', toppingSchema);

module.exports = Topping