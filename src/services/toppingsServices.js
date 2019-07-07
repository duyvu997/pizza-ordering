const Topping = require('../models/toppings/toppingsModel');
const Category = require('../models/categories/categoriesModel');
const ToppingsDTO =  require('../models/toppings/toppings.DTO');


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
        const toppingsData = ToppingsDTO.convertReturnTopingsByCategory(toppings);
        return toppingsData;
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