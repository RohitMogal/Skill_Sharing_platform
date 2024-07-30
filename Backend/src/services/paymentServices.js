const executeQuery = require("../config/db_config");
const moment = require('moment');

// Function to create a new Payment
const createPayment = async(UserId, SessionId, Amount) => {
    try {
        // Generate OrderId
        const currentDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
            //const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // Format: YYYYMMDD
        const uniqueId = Math.random().toString(36).substring(2, 8); // Random string for uniqueness
        const OrderId = `${currentDate}-${uniqueId}`;

        const query = `
            INSERT INTO payment (UserId, SessionId, Amount, OrderId, CreatedAt, IsSuccess) 
            VALUES (?, ?, ?, ?, NOW(), false)
        `;
        const result = await executeQuery(query, [UserId, SessionId, Amount, OrderId]);
        return result;
    } catch (err) {
        throw new Error("Error creating Payment: " + err.message);
    }
};

// Function to retrieve all payments
const getPayment = async() => {
    try {
        const query = `SELECT UserId, SessionId, Amount, OrderId FROM payment`;
        const result = await executeQuery(query);
        return result;
    } catch (err) {
        throw new Error("Error fetching payments: " + err.message);
    }
};

// Function to retrieve a specific payment by its ID
const getPaymentById = async(Id) => {
    try {
        const query = 'SELECT UserId, SessionId, Amount, OrderId FROM payment WHERE Id = ?';
        const result = await executeQuery(query, [Id]);
        return result;
    } catch (err) {
        throw new Error("Error fetching Payment by user ID: " + err.message);
    }
};

module.exports = {
    createPayment,
    getPayment,
    getPaymentById,
};