const mongoose = require('mongoose'),
Schema  =  mongoose.Schema;

let toppingSchema =  new Schema({
    toppingID :  Schema.Types.ObjectId,
    toppingName :  String,
    toppingPrice : Number,
    toppingCategory: {type:Schema.Types.ObjectId, ref : 'Category'}
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


toppingSchema.statics.getPrice = async function getPrice(toppingID) {
    const topping  = await Topping.getById(toppingID);
    if(!topping){
        return 0;
    }
    return topping.toppingPrice;

};

const Topping = mongoose.model('Topping', toppingSchema);

module.exports = Topping