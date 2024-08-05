const executeQuery = require("../config/db_config");
const { uuid } = require("uuidv4");

// Create a new user and associate interests
const createUser = async (
  fullName,
  email,
  password,
  profilePicture,
  about,
  interests,
) => {
  try {
    // Generate a new unique user ID
    const id = uuid();

    // Query to insert the new user into the User table
    const query = `
      INSERT INTO User (id, fullName, email, password, profilePicture, about, createdat, updatedat) 
      VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW());
    `;

    // Execute the query
    const result = await executeQuery(query, [
      id,
      fullName,
      email,
      password,
      profilePicture,
      about,
    ]);

    // Insert each interest into the UserInterest table
    await Promise.all(
      interests.map(async (interest) => {
        const interestInsertQuery = `
          INSERT INTO UserInterest (UserId, Interests) 
          VALUES (?, ?);
        `;
        await executeQuery(interestInsertQuery, [id, interest]);
      }),
    );

    return result;
  } catch (err) {
    throw new Error("Error creating user: " + err.message);
  }
};

// Get all users with their interests
const getUser = async () => {
  try {
    // Query to fetch all users along with their interests
    const query = `
      SELECT 
        u.fullName, 
        u.email,  
        u.profilePicture, 
        u.rating, 
        u.about, 
        u.createdat,
        JSON_ARRAYAGG(ui.Interests) AS Interests 
      FROM User u 
      LEFT JOIN UserInterest ui ON u.Id = ui.UserId 
      WHERE u.IsDeleted = ? 
      GROUP BY u.Id;
    `;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching users: " + err.message);
  }
};

// Get a specific user by their ID
const getUserById = async (id) => {
  try {
    // Get the average rating for the user
    const getUserRatingQuery = `
      SELECT AVG(Rating) AS Rating 
      FROM session 
      WHERE userid = ? 
      GROUP BY UserId;
    `;
    const getUserRatingResult = await executeQuery(getUserRatingQuery, [id]);

    // Update the user's rating in the User table
    const updateUserRatingQuery = `
      UPDATE User 
      SET Rating = ? 
      WHERE id = ?;
    `;
    await executeQuery(updateUserRatingQuery, [
      getUserRatingResult[0]?.Rating || null,
      id,
    ]);

    // Query to fetch the user's details
    const query = `
      SELECT 
        fullName, 
        email,  
        profilePicture, 
        rating, 
        about 
      FROM User  
      WHERE Id = ? AND IsDeleted = ?;
    `;
    const result = await executeQuery(query, [id, false]);

    return result;
  } catch (err) {
    throw new Error("Error fetching user by ID: " + err.message);
  }
};

// Update a user's details
const updateUser = async (id, fullName, profilePicture, about) => {
  try {
    // Query to update the user's details
    const query = `
      UPDATE User 
      SET fullName = ?, 
          profilePicture = ?, 
          about = ? 
      WHERE id = ?;
    `;
    const result = await executeQuery(query, [
      fullName,
      profilePicture,
      about,
      id,
    ]);

    return result;
  } catch (err) {
    throw new Error("Error updating user: " + err.message);
  }
};

// Soft delete a user by setting IsDeleted to true
const deleteUser = async (id) => {
  try {
    // Query to mark the user as deleted
    const query = `
      UPDATE User 
      SET IsDeleted = ? 
      WHERE Id = ?;
    `;
    const result = await executeQuery(query, [true, id]);

    return result;
  } catch (err) {
    throw new Error("Error deleting user: " + err.message);
  }
};

module.exports = { createUser, getUser, getUserById, updateUser, deleteUser };
