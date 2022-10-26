const db = require("../model/redis");
const mySql = require("../../BatchLayer/model/mySql");

const reduceQuantity = async (req, res) => {
  const { cityName , taste , quantity } = req.body;
  try {
    const value = await db.get(cityName);
    value[taste] -= quantity;
    await db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const addQuantity = async (req, res) => {
  const { cityName , taste , quantity } = req.body;
  try {
    const value = await db.get(cityName);
    value[taste] += quantity;
    await db.set(cityName, JSON.stringify(value));
    res.status(200).send("approved");
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getBranchQuantity = async (req, res) => {
  let { cityName } = req.body;
  try {
    const value = await db.get(cityName);
    console.log(value);
    res.status(200).send(value);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getAllQuantity = async (req, res) => {
  let branches;
  let Chocolate = 0,Vanilla = 0,Strawberry = 0,Lemon = 0, Halvah = 0
  let sql = `SELECT cityName FROM ice_scream_db.branches_info;`;
  try {
    branches = await mySql.executeQuery(sql)
    for(const branch of branches){
      let element = await db.get(`${branch.cityName}`);
      Chocolate += element.Chocolate;
      Vanilla += element.Vanilla;
      Strawberry += element.Strawberry;
      Lemon += element.Lemon;
      Halvah += element.Halvah;
    }

    const obj = {
      totalChocolate: Chocolate,
      totalVanilla: Vanilla,
      totalStrawberry: Strawberry,
      totalLemon: Lemon,
      totalHalvah: Halvah,
    };

    console.log(obj);
    res.status(200).json(obj);
  } catch (error) {
    res.status(400).send("error");
    console.log(error);
  }
};

const getTastes = async (req, res) => {
  const value = await db.get("אשדוד");
  const tastes = Object.keys(value);
  if (tastes) res.status(200).send(tastes);
  else res.status(400).send("error");
};

module.exports = {
  reduceQuantity,
  addQuantity,
  getBranchQuantity,
  getAllQuantity,
  getTastes
};