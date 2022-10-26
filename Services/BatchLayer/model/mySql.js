const mysql = require("mysql");
const mySqlConfig = require("../../config/mySql.config");
let connection;

const createSqlConnection = () => {
  return new Promise((resolve, reject) => {
    connection = mysql.createConnection(mySqlConfig);
    connection.connect((err) => {
      if (err) return reject(err);
      console.log("sql is connected");

      return resolve();
    });
  });
};

const executeQuery = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results);
    });
  });
};

const getCityById = (id) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT cityName FROM ice_scream_db.branches_info WHERE id = ${id};`;
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      return resolve(results[0].cityName);
    });
  });
};

const getCityByName = (cityName) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT cityType,toddlers,kids,adolescent,adults,middleAge,seniors 
                 FROM ice_scream_db.branches_info WHERE CityName = '${cityName}';`;
    connection.query(query, (error, results, fields) => {
      if (error) return reject({ error });
      console.log(results[0]);
      return resolve(results[0]);
    });
  });
};

const getAllCities = () => {
  return new Promise((resolve, reject) => {
    let query =`SELECT cityName FROM ice_scream_db.branches_info;`;
    executeQuery(query);
    // connection.query(query, (error, results, fields) => {
    //   if (error) return reject({ error });
    //   return resolve(results);
    // });
  });
}

const getCitiesList = async (req, res) => {
  try {
    const data = await getAllCities();
    const arr =[]
    Object.values(data).forEach((city)=>arr.push(city.cityName))
    res.status(200).send(arr);
  } catch (error) {
    console.log(error);
    res.status(400).send("error fetching data");
  }
};

module.exports = { createSqlConnection , executeQuery, getCityById, getCityByName, getCitiesList, getAllCities };