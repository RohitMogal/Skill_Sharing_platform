const executeQuery = require("../config/db_config");

const createsession = async (
  UserId,
  Description,
  Title,
  Link,
  Img,
  Interests,
  SessionTime,
  Amount,
) => {
  console.log(
    UserId,
    Description,
    Title,
    Link,
    Img,
    Interests,
    SessionTime,
    Amount,
  );
  try {
    const query = `
            INSERT INTO session
            (UserId, Description, Title, Link, Img, Interests, SessionTime, CreatedAt,Amount) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, NOW(),?);
        `;
    const result = await executeQuery(query, [
      UserId,
      Description,
      Title,
      Link,
      Img,
      Interests,
      SessionTime,
      Amount,
    ]);
    return result;
  } catch (err) {
    console.log(err.message);
    throw new Error("Error creating session: " + err.message);
  }
};

const getfilterSession = async (intrests) => {
  try {
    const query = `SELECT UserId, Description, Title, Link, Img, Interests, SessionTime, Amount FROM session WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    const userInterestArray = JSON.parse(intrests);
    console.log(userInterestArray);

    const commonElements = result.filter((element) => {
      const interestsArray = JSON.parse(element.Interests);
      return interestsArray.some((interest) =>
        userInterestArray.includes(interest),
      );
    });

    return commonElements;
  } catch (err) {
    throw new Error("Error fetching sessions: " + err.message);
  }
};

const getSession = async () => {
  try {
    const query = `SELECT UserId, Description, Title, Link, Img, Interests, SessionTime, Amount FROM session WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching sessions: " + err.message);
  }
};

const getSessionById = async (id) => {
  try {
    const query = `SELECT UserId, Description, Title, Link, Img, Interests, SessionTime, Amount FROM session WHERE id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching session by ID: " + err.message);
  }
};

const updateSession = async (
  id,
  UserId,
  Description,
  Title,
  Link,
  Img,
  Interests,
  SessionTime,
) => {
  try {
    const query = `
      UPDATE session SET 
      UserId = ?, 
      Description = ?, 
      Title = ?, 
      Link = ?, 
      Img = ?, 
      Interests = ?, 
      SessionTime = ?
      WHERE id = ?`;

    const values = [
      UserId,
      Description,
      Title,
      Link,
      Img,
      Interests,
      SessionTime,
      id,
    ];

    const result = await executeQuery(query, values);
    return result;
  } catch (err) {
    throw new Error("Error updating session: " + err.message);
  }
};

const deleteSession = async (id) => {
  try {
    const query = `UPDATE session SET IsDeleted = ? WHERE SessionId = ? `;
    const result = await executeQuery(query, [true, id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting session: " + err.message);
  }
};

module.exports = {
  createsession,
  getSession,
  getSessionById,
  updateSession,
  deleteSession,
  getfilterSession,
};
