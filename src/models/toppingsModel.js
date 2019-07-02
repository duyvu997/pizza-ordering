const mongoose = require('mongoose'),
Schema  =  mongoose.Schema;

let toppingSchema =  new Schema({
    toppingID :  Schema.Types.ObjectId,
    toppingName :  String,
    toppingPrice : Number
});

toppingSchema.statics.getById = async function getById(toppingID) {
    // console.log(toppingID)
    const result = await this.findOne({
            _id: toppingID //conditions
        },
        function (err, data) { // callback 
            if (err) {
                throw err;
            }
            return data;
        });
    // console.log(result);
    return result;
};



toppingSchema.statics.calculatePrices = async function calculatePrices(toppingID, quantity) {
    const topping  = await Topping.getById(toppingID);
    return topping.toppingPrice*quantity;

};

const Topping = mongoose.model('Topping', toppingSchema);

module.exports = Topping