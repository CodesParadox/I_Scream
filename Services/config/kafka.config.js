require("dotenv/config")

module.exports = {
    "group.id": "cloudkarafka",
    "metadata.broker.list": `${process.env.KAFKA_BROKERS}`.split(","),
    "socket.keepalive.enable": true,
    "security.protocol": "SASL_SSL",
    "sasl.mechanisms": "SCRAM-SHA-256",
    "sasl.username": process.env.KAFKA_USERNAME,
    "sasl.password": process.env.KAFKA_PASSWORD,
    "debug": "generic,broker,security",
};