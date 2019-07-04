const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    categoryName: String,
    products:[{type: Schema.Types.ObjectId, ref:'Product', required: false}],
    toppings:[{type: Schema.Types.ObjectId, ref:'Topping', required: false}]  
});


const Category = mongoose.model("Category", categorySchema);

module.exports = 
    Category
