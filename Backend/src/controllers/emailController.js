const emailServices = require("../services/email.service");
const calendarService = require("../services/email.service");

const interestedEmail = async (req, res) => {
  try {
    console.log("Controller: Processing email request");

    const {
      fullName,
      email,
      userId,
      sessionId,
      sessionTime,
      link,
      sessionCreator,
      title,
    } = req.body;

    // Call the service function to send email
    const result = await emailServices.interestedEmail(
      fullName,
      email,
      userId,
      sessionId,
      sessionTime,
      link,
      sessionCreator,
      title,
    );

    if (result) {
      res.status(200).json({
        success: true,
        message: "Email sent successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Email sending failed. Please try again later.",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server Error",
    });
  }
};

// const googleAuth = (req, res) => {
//   const url = calendarService.generateAuthUrl();
//   res.send({ url });
// };

// const googleRedirect = async (req, res) => {
//   try {
//     const code = req.query.code;
//     await calendarService.getToken(code);
//     res.send("Authentication successful! You can now create events.");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error during authentication.");
//   }
// };

// const createEvent = async (req, res) => {
//   try {
//     await calendarService.createEvent(req.body);
//     res.send({ message: "Event created successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error creating event.");
//   }
// };

module.exports = {
  // googleAuth,
  // googleRedirect,
  // createEvent,
  interestedEmail,
};
