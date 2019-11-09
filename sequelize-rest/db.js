const Sequelize = require("sequelize");

const databaseURl = "postgres://postgres:secret@localhost:5432/postgres";
const db = new Sequelize(databaseURl);

db.sync({ force: false })
  .then(console.log("Database synced."))
  .catch(error => console.error(error));

module.exports = db;
