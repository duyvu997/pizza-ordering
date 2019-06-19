const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let categorySchema = new Schema({
    categoryName: String  
});


const Category = mongoose.model("Category", categorySchema);

module.exports = {
    Category
};