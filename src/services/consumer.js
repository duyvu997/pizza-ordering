var Kafka = require("node-rdkafka");
require('dotenv').config();

var kafkaConf = {
  "group.id": "cloudkarafka-example",
  // "metadata.broker.list": process.env.CLOUDKARAFKA_BROKERS.split(","),
  "metadata.broker.list": "omnibus-01.srvs.cloudkafka.com:9094,omnibus-02.srvs.cloudkafka.com:9094,omnibus-03.srvs.cloudkafka.com:9094",
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "ssl.ca.location":'./cloudkafka.ca',
  "sasl.username": process.env.CLOUDKARAFKA_USERNAME,
  "sasl.password": process.env.CLOUDKARAFKA_PASSWORD,
  "debug": "generic,broker,security"
};

const prefix = process.env.CLOUDKARAFKA_TOPIC_PREFIX;
const topic = [`${prefix}updateOrder`];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});
const numMessages = 5;
let counter = 0;

consumer.on("error", function (err) {
  console("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  console.error(err);
});
consumer.on("ready", function (arg) {
  console.log(`Consumer ${arg.name} ready`);
  consumer.subscribe(topic);
  consumer.consume();
});
consumer.on("data", function (m) {
    console("eeeeeeeeeeeeeeeeeeeeeeeeeeeee")
  counter++;
  if (counter % numMessages === 0) {
    console.log("calling commit");
    consumer.commit(m);
  }
  console.log(m.value.toString());
});
consumer.on("disconnected", function (arg) {
  process.exit();
});
consumer.on('event.error', function (err) {
  console.error(err);
  process.exit(1);
});
consumer.on('event.log', function (log) {
  console.log(log);
});

consumer.connect();

// setTimeout(function () {
//   consumer.disconnect();
// }, 300000);