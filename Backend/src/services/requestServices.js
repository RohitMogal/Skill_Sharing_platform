const executeQuery = require("../config/db_config");

const createRequest = async (UserId, Description, Title) => {
  try {
    const query = `
      INSERT INTO request
      (UserId, Description, Title, CreatedAt) 
      VALUES 
      (?, ?, ?, NOW());
    `;
    const result = await executeQuery(query, [UserId, Description, Title]);
    return result;
  } catch (err) {
    throw new Error("Error creating request: " + err.message);
  }
};

const getRequest = async () => {
  try {
    const query = `SELECT UserId, Description, Title, CreatedAt FROM request WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching requests: " + err.message);
  }
};

const getRequestById = async (id) => {
  try {
    const query = `SELECT UserId, Description, Title, CreatedAt FROM request WHERE Id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching request by ID: " + err.message);
  }
};

const updateRequest = async (id, UserId, Description, Title) => {
  try {
    const query = `
      UPDATE request SET 
      UserId = ?, 
      Description = ?, 
      Title = ?
      WHERE Id = ?`;

    const values = [UserId, Description, Title, id];

    const result = await executeQuery(query, values);
    return result;
  } catch (err) {
    throw new Error("Error updating request: " + err.message);
  }
};

const deleteRequest = async (id) => {
  try {
    const query = `UPDATE request SET IsDeleted = ? WHERE Id = ?`;
    const result = await executeQuery(query, [true, id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting request: " + err.message);
  }
};

module.exports = {
  createRequest,
  getRequest,
  getRequestById,
  updateRequest,
  deleteRequest,
};
