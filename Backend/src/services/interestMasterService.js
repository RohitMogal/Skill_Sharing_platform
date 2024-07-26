const executeQuery = require("../config/db_config");

const createInterest = async (Interest) => {
  try {
    const query = `INSERT INTO InterestMaster (Interest, IsDeleted) VALUES (?, ?);`;
    const result = await executeQuery(query, [Interest, false]);
    return result;
  } catch (err) {
    throw new Error("Error creating interest: " + err.message);
  }
};

const getInterest = async () => {
  try {
    const query = `SELECT Interest FROM InterestMaster`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const getInterestById = async (id) => {
  try {
    const query = `SELECT Interest FROM InterestMaster WHERE Id = ? AND IsDeleted = ?;`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const updateInterest = async (id, Interest) => {
  try {
    const query = `UPDATE InterestMaster SET Interest = ? WHERE Id = ? AND IsDeleted = ?;`;
    const result = await executeQuery(query, [Interest, id, false]);
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("Error updating interest: " + err.message);
  }
};

const deleteInterest = async (id) => {
  try {
    const query = `UPDATE InterestMaster SET IsDeleted = ? WHERE Id = ?;`;
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
