const redis = require("redis");
require('dotenv').config({ path: require('find-config')('.env') })
let publisher;

const createRedisConnection = () => {
  return new Promise((resolve, reject) => {
      if (publisher) return resolve();
      publisher = redis.createClient({
          socket: {
              host: process.env.REDIS_URL,
              port: process.env.REDIS_PORT
          },
          password: process.env.REDIS_PASSWORD
      });
      publisher.connect();
      publisher.on("connect",  () => {
          console.log("redis is connected");
          return resolve();
      });
      publisher.on("error", () => {
          console.log("redis connection error");
          return reject()
      });
  });
};


const flushRedisDB = () => {
    publisher.flushAll();
}

const exist = (cityName) => {
    return publisher.exists(cityName);
}

const set = (cityName,value) => {
    return new Promise((resolve, reject) => {
        publisher
            .set(cityName, value)
            .then((res) => {
                return resolve (res)
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

const get = (cityName) => {
    return new Promise((resolve,reject) => {
        publisher.get(cityName).then((res) => {
            return resolve(JSON.parse(res))
        }).catch((err) => {
          return reject(err);
        })
    });
}

module.exports = {
  createRedisConnection,
  flushRedisDB,
  exist,
  set,
  get
};
