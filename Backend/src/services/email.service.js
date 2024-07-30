const { sendEmail } = require("../helper/email");
const { google } = require("googleapis");

const { parseISO, format } = require("date-fns");
const { utcToZonedTime, format: formatTz } = require("date-fns-tz");

const interestedEmail = async (
  fullName,
  email,
  userId,
  sessionId,
  sessionTime,
  link,
  sessionCreator,
  title,
) => {
  // Format the session time
  const formattedSessionTime = new Date(sessionTime).toLocaleString(); // Adjust formatting as needed

  // Email subject and body
  const subject = `Thank You for Your Interest in Our Session!`;
  const text = `
Dear ${fullName},

We hope this email finds you well.

Thank you for showing interest in our upcoming session! We are excited to have you join us and look forward to an engaging and informative session.

Event: ${title}

Date and Time: ${formattedSessionTime}

Event Link: ${link}

Once again, thank you for your interest. We are looking forward to seeing you at the event!

Best regards,

${sessionCreator}`;

  try {
    return await sendEmail(email, subject, text);
  } catch (error) {
    console.error("Error in interestedEmail function:", error);
    throw error;
  }
};

// Define sendEmail function (or import it if it's defined elsewhere)
// Ensure it handles sending emails correctly

////Google Calendar
// const oauth2Client = new google.auth.OAuth2(
//   "963395947456-fnsoj7runfv6lcejru3cpgm6q44n6fvn.apps.googleusercontent.com",
//   "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",
//   "http://localhost:4000/email/google/redirect",
// );

// const calendar = google.calendar({
//   version: "v3",
//   auth: oauth2Client,
// });

// let oauthTokens = null;

// const setOAuthTokens = (tokens) => {
//   oauthTokens = tokens;
//   oauth2Client.setCredentials(tokens);
// };

// const generateAuthUrl = () => {
//   const scopes = ["https://www.googleapis.com/auth/calendar"];
//   return oauth2Client.generateAuthUrl({
//     access_type: "offline",
//     scope: scopes,
//   });
// };

// const getToken = async (code) => {
//   const { tokens } = await oauth2Client.getToken(code);
//   setOAuthTokens(tokens);
//   return tokens;
// };

// const createEvent = async (eventDetails) => {
//   if (!oauthTokens) {
//     throw new Error("Unauthorized: No OAuth tokens set.");
//   }

//   oauth2Client.setCredentials(oauthTokens);

//   const {
//     email,
//     link,
//     startDate,
//     startTime,
//     endTime,
//     description,
//     summary,
//     location,
//   } = eventDetails;

//   const startDateTime = `${startDate}T${startTime}+05:30`;
//   const endDateTime = `${startDate}T${endTime}+05:30`;

//   await calendar.events.insert({
//     calendarId: "primary",
//     auth: oauth2Client,
//     requestBody: {
//       description: `${description} Here's a link: ${link}`,
//       summary: summary,
//       location: location,
//       start: {
//         dateTime: startDateTime,
//         timeZone: "Asia/Kolkata",
//       },
//       end: {
//         dateTime: endDateTime,
//         timeZone: "Asia/Kolkata",
//       },
//       attendees: [{ email: email }],
//     },
//   });
// };

module.exports = {
  // generateAuthUrl,
  // getToken,
  // createEvent,
  interestedEmail,
};
