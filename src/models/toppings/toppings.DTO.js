module.exports = {
    convertReturnTopingsByCategory :  function (populateData) {
        return {
            _id: populateData._id,
            categoryName: populateData.categoryName,
            toppings: populateData.toppings
        }

    }
}