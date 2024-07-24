const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("Skill_Scheduling", "root", "Aishwarya$1997", {
    host: "localhost",
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