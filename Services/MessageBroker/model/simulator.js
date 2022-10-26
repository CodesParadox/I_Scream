const mySql = require("../../BatchLayer/model/mySql");
const redis = require("../../StreamLayer/model/redis");
const randomDate = require("../controller/randomDate");

const generatePurchase = async () => {
  return new Promise(async(resolve,reject) =>{
    let date = randomDate(), tastes, quantity, city;

    //MYSQL
    try {
      const randomCityId = Math.floor(Math.random() * 100);

      city = await mySql.getCityById(randomCityId);
    } catch (error) {
      return reject(`error with mysql: ${error}`);
    }

    //REDIS
    try {
      const cityInfo = await redis.get(city);
      tastes = Object.keys(cityInfo);
      quantity = Object.values(cityInfo);
    } catch (error) {

      return  reject(`error with redis: ${error}`);
    }

    const randomTaste = Math.floor(Math.random() * tastes.length);
    const randomQuantity = Math.floor(Math.random() * 5) + 1;

    if (quantity[randomTaste] >= randomQuantity) {

      let obj = {
        date,
        cityName: city,
        quantity: randomQuantity,
        taste: tastes[randomTaste]
      }


      console.log(
          `Purchase succeeded - City: ${city} ${tastes[randomTaste]} with ${randomQuantity}KG`
      );
      resolve(obj);
    } else {
      return reject(`Not enough quantity of ${tastes[randomTaste]} in ${city}`);
    }
  })
};

module.exports = {
  generatePurchase,
};