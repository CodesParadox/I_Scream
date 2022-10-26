const kafka = require("../model/kafka");
const simulator = require("../model/simulator");

let intervalId = -1;
let simulatorRate = 0;
const DEFAULT_RATE = 1;

// Gets purchase and send it to kafka
const sendMessage = async (req, res) => {
    try {
        await kafka.publishMessage(req.body)
        console.log("Message sent to Kafka:");
        res.status(200).json({ message: "Message sent to Kafka", call: req.body });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const startSimulator = (req, res) => {
    clearInterval(intervalId);
    if (simulatorRate < 1) {
        simulatorRate = DEFAULT_RATE;
    }
    intervalId = setInterval(async () => {
        try {
            const purchase = await simulator.generatePurchase();
            await kafka.publishMessage(purchase);
            console.log(purchase);
        } catch (error) {
            return console.log(error);
        }
    }, simulatorRate * 1000);
    console.log("************ Auto mode started ************");
    res.send("************ Auto mode started ************");
};

const stopSimulator = (req, res) => {
    clearInterval(intervalId);
    simulatorRate = 0;
    console.log("************ Auto mode stopped ************");
    res.send("************ Auto mode stopped ************");
};

const getSimulatorStatus = (req, res) => {
    res.status(200).json({ simulatorRate: simulatorRate });
};

const setSimulatorRate = (req, res) => {
    simulatorRate = req.query.rate;
    startSimulator(req, res);
};

module.exports = {
    sendMessage,
    startSimulator,
    stopSimulator,
    getSimulatorStatus,
    setSimulatorRate,
};
