const { KafkaConsumer } = require("node-rdkafka");
require('dotenv').config({ path: require('find-config')('.env') })

const topic = process.env.KAFKA_TOPIC_MONGO;
const kafkaConsumer = new KafkaConsumer(require("../../config/kafka.config"));

kafkaConsumer
    .on("ready", (arg) => {
        kafkaConsumer.subscribe([topic]).consume();
        console.log(`Consumer ${arg.name} ready. topics: ${topic}`);
    })
    .on("disconnected", (arg) =>{
        console.log(`Consumer ${arg.name} disconnected.`)
        kafkaConsumer.connect();
})
    .on("event.error", (err) => console.error(err))
    .connect();

module.exports = kafkaConsumer;