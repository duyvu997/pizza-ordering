// const Kafka = require("node-rdkafka");
// const Joi = require('@hapi/joi');
// require('dotenv').config();
// const kafkaConf = {
//     "group.id": "cloudkarafka-example",
//     "metadata.broker.list": "omnibus-01.srvs.cloudkafka.com:9094,omnibus-02.srvs.cloudkafka.com:9094,omnibus-03.srvs.cloudkafka.com:9094",
//     "socket.keepalive.enable": true,
//     "security.protocol": "SASL_SSL",
//     "sasl.mechanisms": "SCRAM-SHA-256",
    
//     "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
//     "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
//     "debug": "generic,broker,security"
// };

// const validatePayload = {
//     payload: Joi.object().keys({
//         status: Joi.string().valid(["submitted", "processed", "delivered", "cancelled"]).required()
//     }
//     )
    
// }
// const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
// const topic = `${prefix}updateOrder`;
// const sendMesssage = function (req, reply) {
//     const producer = new Kafka.Producer(kafkaConf);

//     const status = req.payload.status;
//     const id = req.params.id;
//     producer.on("ready", function (arg) {
//         console.log(`producer ${arg.name} ready.`);
//         producer.produce(topic, -1, new Buffer.from(JSON.stringify({
//             _id: id,
//             status: status
//         })), 2);
//     });

//     producer.on("disconnected", function (arg) {
//         process.exit();
//     });

//     producer.on('event.error', function (err) {
//         console.error(err);
//         process.exit(1);
//     });

//     producer.connect();
//     return "Message sent successfully!"
// }
// module.exports = {

//     sendMesssage,
//     validatePayload
// }