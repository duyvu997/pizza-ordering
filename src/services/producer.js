const Kafka = require("node-rdkafka");
const Joi = require('@hapi/joi');
const kafkaConf = {
  "group.id": "cloudkarafka-example",
  // "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(','),
  "metadata.broker.list": "omnibus-01.srvs.cloudkafka.com:9094,omnibus-02.srvs.cloudkafka.com:9094,omnibus-03.srvs.cloudkafka.com:9094",
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "ssl.ca.location": './cloudkafka.ca',
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
  // console.log(kafkaConf["metadata.broker.list"])
  const status = req.payload.status;
  const id = req.params.id;
  const producer = new Kafka.Producer(kafkaConf);

  producer.on("ready", function (arg) {
    console.log("asasfjdfev21313");
    console.log(`producer ${arg.name} ready.`);
    producer.produce(topic, 5, new Buffer.from(JSON.stringify({
      _id: id,
      status: status
    })));
  });

  producer.on("disconnected", function (arg) {
    process.exit();
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
    console.log(log);
    process.exit(1);
  });

  producer.connect();
  // console.log(kafkaConf["ssl.ca.location"]);
  return "Message sent successfully!"
}


module.exports = {
  sendMessage,
  validatePayload
}