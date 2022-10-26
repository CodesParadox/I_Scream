const mongo = require("../model/mongo");
const MongoClient = require("mongodb").MongoClient;
const mysql = require("../model/mySql");
const getWeather = require("../api/Weather");
const getHoliday = require("../api/checkCalendar");
const parseSeason = require("../api/parseSeason");
require('dotenv').config({ path: require('find-config')('.env') })

const dbName = "test",
    collectionName = "Purchases";
let mongoConnect;

const createMongoConnection = () => {
    return new Promise(async (resolve, reject) => {
        const client = new MongoClient(process.env.MONGO_DB_URL);
        client
            .connect()
            .then(() => {
                console.log("mongo is connected");
                mongoConnect = client.db(dbName).collection(collectionName);
                return resolve();
            })
            .catch((err) => {
                return reject(err);
            });
    });
};

const insertPurchase = async (req, res) => {
    let { cityName, taste, quantity, date } = req.body;
    try {
        let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } =
            await mysql.getCityByName(cityName);
        const newPurchase = new mongo({
            taste: taste,
            quantity: quantity,
            day: new Date(date).getDate(),
            month: new Date(date).getMonth() + 1,
            year: new Date(date).getFullYear(),
            cityName,
            cityType,
            toddlers,
            kids,
            adolescent,
            adults,
            middleAge,
            seniors,
            season: parseSeason(date),
            holiday: await getHoliday(date),
            weather: getWeather(date, cityName)
        });
        console.log(newPurchase);
        await insertOnePurchase(newPurchase);
        res.status(200).send("purchase inserted");
    } catch (error) {
        console.log(error);
        res.status(400).send("purchase error");
    }
};

const getAllPurchases = async (req, res) => {
    mongo.find()
        .then(purchases => {
            res.status(200).json(purchases);
        }).catch(error => {
        res.status(500).json({
            error
        });
    });
};

const insertOnePurchase = (data) => {
    return mongoConnect.insertOne(data);
};

const deleteAllPurchases = async () => {
    mongo.deleteMany({});
}

module.exports = {
    createMongoConnection,
    insertPurchase,
    insertOnePurchase,
    getAllPurchases,
    deleteAllPurchases,
};