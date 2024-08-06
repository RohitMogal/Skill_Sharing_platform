const executeQuery = require("../config/db_config");
const moment = require("moment");
const sendemail = require("../services/email.service");

// Function to create a new Payment
const createPayment = async (UserId, SessionId, Amount) => {
  try {
    // Generate OrderId
    const currentDate = moment().format("YYYYMMDD");
    const uniqueId = Math.random().toString(36).substring(2, 8);
    const OrderId = `${currentDate}-${uniqueId}`;
    const query = `
      INSERT INTO payment (UserId, SessionId, Amount, OrderId, CreatedAt, IsSuccess) 
      VALUES (?, ?, ?, ?, NOW(), ?)
    `;

    const result = await executeQuery(query, [
      UserId,
      SessionId,
      Amount,
      OrderId,
      false,
    ]);

    console.log(!(result.affectedRows > 1));
    if (!(result.affectedRows > 1)) {
      // Retrieve session details and user info for sending an email
      const mailquery = `SELECT 
        u1.fullname AS sessioncreator, 
        s.description, 
        s.title, 
        s.link,  
        s.sessiontime, 
        s.amount, 
        u2.fullname, 
        u2.email 
      FROM session s 
      JOIN user u1 ON u1.id = s.userid  
      JOIN user u2 ON u2.id = ?        
      WHERE s.id = ?;`;

      const mailQueryResult = await executeQuery(mailquery, [
        UserId,
        SessionId,
      ]);

      const { fullname, email, sessiontime, link, sessioncreator, title } =
        mailQueryResult[0];
      await sendemail.interestedEmail(
        fullname,
        email,
        sessiontime,
        link,
        sessioncreator,
        title,
      );
    }

    return result;
  } catch (err) {
    throw new Error("Error creating Payment: " + err.message);
  }
};

// Function to retrieve all payments
const getPayment = async () => {
  try {
    const query = `SELECT UserId, SessionId, Amount, OrderId FROM payment`;
    const result = await executeQuery(query);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Function to retrieve a specific payment by its ID
const getPaymentById = async (Id) => {
  try {
    const query =
      "SELECT UserId, SessionId, Amount, OrderId FROM payment WHERE Id = ?";
    const result = await executeQuery(query, [Id]);
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  createPayment,
  getPayment,
  getPaymentById,
};
