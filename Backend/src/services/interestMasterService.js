const executeQuery = require("../config/db_config");

const createInterest = async (Interest) => {
  try {
    const query = `INSERT INTO Interest (Interest) VALUES (?);`;
    const result = await executeQuery(query, [Interest]);
    return result;
  } catch (err) {
    throw new Error("Error creating interest: " + err.message);
  }
};

const getInterest = async () => {
  try {
    const query = `SELECT id,Interest FROM Interest`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const getInterestById = async (id) => {
  try {
    const query = `SELECT id,Interest FROM Interest WHERE Id = ?;`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const updateInterest = async (id, Interest) => {
  try {
    const query = `UPDATE Interest SET Interest = ? WHERE Id = ? ;`;
    const result = await executeQuery(query, [Interest, id, false]);
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("Error updating interest: " + err.message);
  }
};

const deleteInterest = async (id) => {
  try {
    const query = `UPDATE Interest SET WHERE Id = ?;`;
    const result = await executeQuery(query, [true, id]);
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
