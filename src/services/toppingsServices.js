const Topping = require('../models/toppingsModel');
const Category = require('../models/categoriesModel');


const getAll = async function () {
    try {
        const result = await Topping.find({});
        return result;
    } catch (err) {
        throw err;
    }
}


const findTopings = async (cateName) => {
    try {
        let toppings = await Category.findOne({
            categoryName: cateName
        }).populate('toppings');
        return toppings;
    } catch (err) {
        throw err
    }
}


const findToppingsByCategory = async function (categoryName) {
    try {
        const result = await findTopings(categoryName);
        return result;
    } catch (err) {
        throw err;
    }
}



module.exports = {
    getAll,
    findToppingsByCategory
}