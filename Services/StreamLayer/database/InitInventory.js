const mySql = require("../../BatchLayer/model/mySql");
const redis = require("../model/redis");

var sql = `SELECT cityName FROM ice_scream_db.branches_info;`;

const obj = {
  Vanilla: 100,
  Chocolate: 100,
  Strawberry: 100,
  Lemon: 100,
  Halvah: 100,
};

mySql.createSqlConnection().then(() => {
  redis.createRedisConnection().then(async () => {
    let exist;
    try {
      exist = await redis.exist("חיפה");

    } catch (err) {
      return console.log(err);
    }
    if (exist) {
      console.log("db already exist");
    } else {
      mySql
        .executeQuery(sql)
        .then((res) => {
          res.forEach(async (element) => {
            try {
              await redis.set(`${element.cityName}`, JSON.stringify(obj));
              console.log("success push to redis");
            } catch (err) {
              // return console.log(err);
            }
          });
        })
        .catch(console.log);

    }
  });
});