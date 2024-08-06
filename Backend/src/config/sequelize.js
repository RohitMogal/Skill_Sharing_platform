//Establishes a connection to a database using Sequelize.
const { Sequelize } = require("sequelize");
require("dotenv").config();
//Creates a new Sequelize instance.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST_CONFIG,
    dialect: process.env.DB_DIALECT,
    logging: false,
  },
);
//Tests the connection to the database.
async function testConnection() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
module.exports = sequelize;
