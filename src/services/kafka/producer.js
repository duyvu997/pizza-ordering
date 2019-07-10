const Kafka  = require("node-rdkafka");
const Joi    = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);

require('dotenv').config();

const kafkaConf = {
  "group.id"               : "cloudkarafka-example",
  "metadata.broker.list"   : process.env.CLOUDKARAFKA_BROKERS.split(','),
  "socket.keepalive.enable": true,
  "security.protocol"      : "SASL_SSL",
  "sasl.mechanisms"        : "SCRAM-SHA-256",
  "sasl.username"          : process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password"          : process.env.CLOUDKARAFKA_PASSWORD,
  'dr_cb'                  : true,
  "debug"                  : "generic,broker,security,all"
};

const prefix   = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topic    = `${prefix}processOrder`;


const validatePayload = {
  params: Joi.object().keys({
    id: Joi.objectId()
  }),
  payload: Joi.object().keys({
    status: Joi.string().valid([ "delivered", "successed", "cancelled"]).required()
  }), failAction: (req, h, error) => {
    return error.isJoi
    ? h.response({ message: error.details[0].message }).code(400).takeover() : h.response(error).code(500).takeover();
  }
}


const sendOrderInfo = function (orderID, username, address, userphone, cartitems) {
  
  const producer = new Kafka.Producer(kafkaConf, { "request.required.acks": 1 });
  producer.connect();

  producer.on("ready", function (arg) {
    console.log('Producer ready');
    console.log(`Producer ${arg.name} ready`);  
    try {
      console.log('procedure sendOrderInfo: ID: '+ orderID + ' name: '+username );
      producer.produce(topic, -1, new Buffer.from(JSON.stringify({
        _id: orderID,
        userName: username,
        userAddress: address,
        userPhone: userphone,
        cartItems: cartitems
      })
      ), 2);
    
    } catch (err) {
      console.error(err);
    }
  });
  
  // Register delivery report listener
  producer.on('delivery-report', function (err, report) {
    if (err) {
      console.error('Delivery report       : Failed sending message ' + JSON.stringify(report));
      console.error(err);
      console.log(report)
      // We could retry sending the message or store it locally
    } else {
      console.log('Message produced, offset: ' + report.offset);
    }
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
  
  
  producer.on("disconnected", function (arg) {
    process.exit(1);
  });
  
  
  return "Message sent successfully!"
}

module.exports = {
  sendOrderInfo,
  validatePayload
}