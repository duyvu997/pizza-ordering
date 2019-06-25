const mongoose = require('mongoose');
const config =  require('./env-conf');



const url = config.database.url

mongoose.connect(url, {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection to DB error'));

db.once('open', function (){
    console.log('Database connected successfull !!! ');
    module.exports = db;
} );


// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://ngocduy799:<password>@pizzaorderclouddb-bvcbc.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });

// client.connection;
// // client.set('useFindAndModify', false);
// // client.connect(err => {
// //   const collection = client.db("test").collection("devices");
// //   // perform actions on the collection object
// //   client.close();
// // });
// client.on('error', console.error.bind(console, 'connection to DB error'));

// client.once('open', function (){
//     console.log('Database connected successfull !!! ');
//     module.exports = client;
// } );

// module.exports = client
