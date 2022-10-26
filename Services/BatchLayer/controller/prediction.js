const DecisionTree = require("decision-tree");
const { getAllPurchases } = require("../model/mongo");
const { getCityByName } = require("../model/mySql");
const parseSeason = require("../api/parseSeason");
const getHoliday = require("../api/checkCalendar");
const getWeather = require("../api/Weather");

const predictPurchase = async (req, res) => {
  const trainingData = await getAllPurchases();
  const className = "quantity";
  const features = [
    "cityName",
    "cityType",
    "toddlers",
    "kids",
    "adolescent",
    "adults",
    "middleAge",
    "seniors",
    "season",
    "holiday",
    "weather",
    "taste",
  ];

  const dt = new DecisionTree(trainingData, className, features);

  let date = new Date();
  let changingDate = new Date(date.getTime());

  let { cityName, taste } = req.body;
  let { cityType, toddlers, kids, adolescent, adults, middleAge, seniors } = await getCityByName(cityName);

  let arr = []

  for (let i = 0; i < 7; i++) {
    changingDate.setDate(changingDate.getDate() + i);
    
    let obj = {
      taste,
      cityName,
      cityType,
      toddlers,
      kids,
      adolescent,
      adults,
      middleAge,
      seniors,
      season: parseSeason(changingDate),
      holiday: await getHoliday(changingDate),
      weather: getWeather(changingDate),
    };

    let predictedClass = dt.predict(obj);
    arr.push(predictedClass)
  }

  res.status(200).send(arr);
};

module.exports = {
  predictPurchase,
};
