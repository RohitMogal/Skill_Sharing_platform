const { query } = require("express");
const executeQuery = require("../config/db_config");
const moment = require("moment");
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
  console.log(SessionTime);
  const convertedDate = moment("2024-07-29T18:08:19.000Z").format(
    "YYYY-MM-DD HH:mm:ss",
  );
  console.log(convertedDate);

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
      convertedDate,
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
    const parsedResult = result.map((session) => {
      return {
        ...session,
        Interests: JSON.parse(session.Interests),
      };
    });
    return parsedResult;
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
const myActivity = async (id) => {
  try {
    const myActivity = {};

    const mySession = `SELECT 
        UserId, Description, Title, Link, Img, Interests, SessionTime, Amount
    FROM session 
    WHERE UserId = ?`;
    const mySessionresult = await executeQuery(mySession, [id]);
    myActivity.sessions = mySessionresult;

    const myRequest = `SELECT 
        UserId, Description, Title, CreatedAt
    FROM request 
    WHERE UserId = ?`;
    const myRequestresult = await executeQuery(myRequest, [id]);
    myActivity.requests = myRequestresult;

    const myEnrolment = `SELECT 
        UserId, SessionId, Amount, OrderId
    FROM payment 
    WHERE UserId = ?`;
    const myEnrolmentresult = await executeQuery(myEnrolment, [id]);
    myActivity.enrolments = myEnrolmentresult;

    return myActivity;
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
  myActivity,
};
