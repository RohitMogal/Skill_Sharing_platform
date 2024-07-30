const executeQuery = require("../config/db_config");

const createRequest = async (UserId, Description, Interest) => {
  try {
    const query = `
      INSERT INTO request
      (UserId, Description, Interest, CreatedAt) 
      VALUES 
      (?, ?, ?, NOW());
    `;
    const result = await executeQuery(query, [UserId, Description, Interest]);
    return result;
  } catch (err) {
    throw new Error("Error creating request: " + err.message);
  }
};

const getRequest = async () => {
  try {
    const query = `SELECT UserId, Description, Interest, CreatedAt FROM request WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching requests: " + err.message);
  }
};

const getFilteredRequest = async (interests) => {
  try {
    const query = `SELECT UserId, Description, Interest, CreatedAt FROM request WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    const userInterestArray = JSON.parse(interests);
    console.log(userInterestArray);

    const commonElements = result.filter((element) => {
      const interestsArray = JSON.parse(element.Interest);
      return interestsArray.some((interest) =>
        userInterestArray.includes(interest),
      );
    });

    return commonElements;
  } catch (err) {
    throw new Error("Error fetching filtered requests: " + err.message);
  }
};

const getRequestById = async (id) => {
  try {
    const query = `SELECT UserId, Description, Interest, CreatedAt FROM request WHERE Id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching request by ID: " + err.message);
  }
};

const updateRequest = async (id, UserId, Description, Interest) => {
  try {
    const query = `
      UPDATE request SET 
      UserId = ?, 
      Description = ?, 
      Interest = ?
      WHERE Id = ?`;

    const values = [UserId, Description, Interest, id];

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
  getFilteredRequest,
};
