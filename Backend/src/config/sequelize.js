const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Skill_Scheduling", "root", "Pass@123", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}

testConnection();
module.exports = sequelize;