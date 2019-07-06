const mongoose = require('mongoose');
const config = require('../../configuration/envConfiguration');



const url = config.database.urlCloud;

mongoose.connect(url, {
    useNewUrlParser: true
});
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to DB error'));

db.once('open', function () {
    console.log('Database connected successfull !!! ');
    module.exports = db;
});