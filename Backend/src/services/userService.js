const executeQuery = require("../config/db_config");
const { uuid } = require("uuidv4");

const createUser = async (fullName, email, password, profilePicture, about) => {
  try {
    const id = uuid();
    const query = `INSERT INTO User  (id, fullName, email, password,profilePicture,about,createdat,updatedat) VALUES (?, ?, ?, ?,?,?,NOW(),NOW());`;
    const result = await executeQuery(query, [
      id,
      fullName,
      email,
      password,
      profilePicture,
      about,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

const getUser = async () => {
  try {
    const query = `SELECT fullName, email, password, profilePicture,rating,about,createdat FROM User  WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching users: " + err.message);
  }
};

const getUserById = async (id) => {
  try {
    // const getUserRatingQuery = `SELECT AVG(Rating) AS Rating from session WHERE userid=? Group By UserId `;
    // const getUserRatingResult = await executeQuery(getUserRatingQuery, [id]);
    // const updateUserRatingQuery = `UPDATE User SET Rating=? WHERE id=? `;
    // await executeQuery(updateUserRatingQuery, [
    //   getUserRatingResult[0].Rating,
    //   id,
    // ]);
    const query = `SELECT fullName, email, password, profilePicture, rating, about FROM User  WHERE Id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);

    return result;
  } catch (err) {
    throw new Error("Error fetching user by ID: " + err.message);
  }
};

const updateUser = async (
  id,
  fullName,
  email,
  password,
  profilePicture,
  about,
) => {
  console.log(id, fullName, email, password, profilePicture, about);
  try {
    let query = `UPDATE User SET fullName=? ,email=? ,password=? ,profilePicture=? ,about=? where id=?`;
    const result = await executeQuery(query, [
      fullName,
      email,
      password,
      profilePicture,
      about,
      id,
    ]);
    return result;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
};

const deleteUser = async (id) => {
  try {
    const query = `UPDATE User  SET IsDeleted = ? WHERE Id = ? `;
    const result = await executeQuery(query, [true, id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting user: " + err.message);
  }
};

module.exports = { createUser, getUser, getUserById, updateUser, deleteUser };
