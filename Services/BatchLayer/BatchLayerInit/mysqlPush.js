const mySql = require("../model/mySql");
const InitBranches = require("./InitBranches");

(async() =>{
  try {
    await mySql.createSqlConnection();
    let branches = await InitBranches();
    for (const element of branches) {
      const sql = `INSERT INTO branches_info (id, cityName, cityType, ownerName, toddlers, kids, adolescent, adults, middleAge, seniors) VALUES ('${
        element.id
      }' , '${element.cityName
        .trim()
        .replace("'", "")}', '${element.cityType.trim()}', '${element.ownerName
        .trim()
        .replace("'", "")}', '${element.toddlers}', '${element.kids}', '${
        element.adolescent
      }', '${element.adults}', '${element.middleAge}', '${element.seniors}')`;
      try {
        await mySql.executeQuery(sql);
        console.log("push row to the table");
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    return console.log(error);
  }
})();