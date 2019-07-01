const Topping = require('../models/toppingsModel');


const getAll = async function () {
    try {
        console.log('aaaaa');
        const result = await Topping.find({})
        console.log(result+'asasasasasa');
        return result;


    } catch (err) {
        throw err;
    }
}

module.exports = {
    getAll
}