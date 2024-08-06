const executeQuery = require("../config/db_config");
const moment = require("moment");

// Function to create a new session
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
  const convertedDate = moment(SessionTime).format("YYYY-MM-DD HH:mm:ss");

  try {
    const query = `
            INSERT INTO session
            (UserId, Description, Title, Link, Img, Interests, SessionTime, CreatedAt, Amount) 
            VALUES 
            (?, ?, ?, ?, ?, ?, ?, NOW(), ?);
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
    throw new Error("Error creating session: " + err.message);
  }
};

// Function to get sessions filtered by user interests
const getfilterSession = async (intrests) => {
  try {
    const query = `SELECT UserId, Description, Title, Link, Img, Interests, SessionTime, Amount FROM session WHERE IsDeleted = ?`;
    const result = await executeQuery(query, [false]);
    const userInterestArray = JSON.parse(intrests);

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

// Function to get all active sessions along with user details
const getSession = async () => {
  try {
    const query = `SELECT 
    s.id,
    s.UserId, 
    s.Description, 
    s.Title, 
    s.Link, 
    s.Img, 
    s.Interests, 
    s.SessionTime, 
    s.Amount, 
    u.fullName,
    u.profilePicture 
FROM session s 
JOIN user u ON u.id = s.UserId  
WHERE s.IsDeleted = ? AND s.SessionTime > NOW();

`;
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

// Function to get a specific session by ID
const getSessionById = async (id) => {
  try {
    const query = `SELECT UserId, Description, Title, Link, Img, Interests, SessionTime, Amount FROM session WHERE id = ? AND IsDeleted = ?`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error fetching session by ID: " + err.message);
  }
};

// Function to update an existing session
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

// Function to delete (soft delete) a session by ID
const deleteSession = async (id) => {
  try {
    const query = `UPDATE session SET IsDeleted = ? WHERE SessionId = ? `;
    const result = await executeQuery(query, [true, id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting session: " + err.message);
  }
};

// Function to retrieve user's activity, including their sessions, requests, enrolments, and past sessions
const myActivity = async (id) => {
  try {
    const myActivity = {};

    const mySession = `SELECT 
        userId, description, title, link, img, interests, sessionTime, amount
    FROM session 
    WHERE UserId = ? and isDeleted=?`;
    const mySessionresult = await executeQuery(mySession, [id, false]);
    myActivity.sessions = mySessionresult;

    const myRequest = `SELECT 
        userId, description, title, createdAt
    FROM request 
    WHERE UserId = ?`;
    const myRequestresult = await executeQuery(myRequest, [id]);
    myActivity.requests = myRequestresult;

    const myEnrolment = `SELECT 
        p.userId, p.sessionId, p.amount, p.orderId,s.title,s.description
    FROM payment p join session s on s.id=p.sessionId
    WHERE p.userId = ?`;
    const myEnrolmentresult = await executeQuery(myEnrolment, [id]);
    myActivity.enrolments = myEnrolmentresult;

    const pastSession = `SELECT 
        id,userId, description, title, link, img, interests, sessionTime, amount
    FROM session 
    WHERE UserId = ? AND SessionTime < NOW();`;
    const pastSessionresult = await executeQuery(pastSession, [id]);
    myActivity.pastsession = pastSessionresult;
    return myActivity;
  } catch (err) {
    throw new Error("Error retrieving activity: " + err.message);
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
