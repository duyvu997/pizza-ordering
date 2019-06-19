const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/pizza-orderring';

mongoose.connect(url, {useNewUrlParser: true});
let db = mongoose. connection;
db.on('error', console.error.bind(console, 'connection to DB error'));
db.once('open', function (){
    console.log('Database connected successfull !!! ');
    module.exports = db;
} );

