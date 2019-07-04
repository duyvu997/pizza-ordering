const Kafka = require("node-rdkafka");
const Joi = require('@hapi/joi');
require('dotenv').config();

const kafkaConf = {
  "group.id": "cloudkarafka-example",
  // "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(','),
 
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  'dr_cb': true,
  "debug": "generic,broker,security"
};

const validatePayload = {
  payload: Joi.object().keys({
    status: Joi.string().valid(["submitted", "processed", "delivered", "cancelled"]).required()
  })
}

const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topic = `${prefix}updateOrder`;
const sendMessage = function (req, reply) {
  
  const status = req.payload.status;
  const id = req.params.id;

  const producer = new Kafka.Producer(kafkaConf);

  producer.on("ready", function (arg) {
    
    console.log(`producer ${arg.name} ready.`);
  
    console.log(topic)
    producer.produce(topic,2,Buffer.from('message '));
    console.log(producer)
  });
  producer.on('error', function (err) {
    console.error(err);
    process.exit(1);
  });
  producer.on('event.error', function (event) {
    console.error(event);
    process.exit(1);
  });
  producer.on('event.stats', function (envent) {
    console.error(envent);
    process.exit(1);
  });
  producer.on('event.log', function (log) {
    // console.log(log);
    
  });
  
  producer.connect();
  
  producer.on("disconnected", function (arg) {
    process.exit();
  });





  return "Message sent successfully!"
}




  

  




module.exports = {
  sendMessage,
  validatePayload
}