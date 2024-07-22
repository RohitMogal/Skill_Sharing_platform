const mysql = require("mysql2/promise");

const mysqlPool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aishwarya$1997',
    database: 'Skill_Scheduling',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

mysqlPool.getConnection()
    .then((connection) => {
        console.log('Connected to database');
        connection.release();
    })
    .catch(err => {
        console.error('Error connecting to database:', err);
    });

module.exports = mysqlPool;