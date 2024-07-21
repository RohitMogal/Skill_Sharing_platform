const executeQuery = require("../config/db_config");

const createInterest = async (Interest) => {
  try {
    const query = `INSERT INTO InterestMaster (Interest, IsDeleted) VALUES (?, false);`;
    const result = await executeQuery(query, [Interest]);
    return result;
  } catch (err) {
    throw new Error("Error creating interest: " + err.message);
  }
};

const getInterest = async () => {
  try {
    const query = `SELECT * FROM InterestMaster`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const getInterestById = async (id) => {
  try {
    const query = `SELECT * FROM InterestMaster WHERE Id = ? AND IsDeleted = false;`;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const updateInterest = async (id, Interest) => {
  try {
    const query = `UPDATE InterestMaster SET Interest = ? WHERE Id = ? AND IsDeleted = false;`;
    const result = await executeQuery(query, [Interest, id]);
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("Error updating interest: " + err.message);
  }
};

const deleteInterest = async (id) => {
  try {
    const query = `UPDATE InterestMaster SET IsDeleted = true WHERE Id = ?;`;
    const result = await executeQuery(query, [id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting interest: " + err.message);
  }
};

module.exports = {
  createInterest,
  getInterestById,
  updateInterest,
  deleteInterest,
  getInterest,
};
