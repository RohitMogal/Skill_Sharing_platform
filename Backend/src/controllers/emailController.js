const emailServices = require("../services/email.service");
const calendarService = require("../services/email.service");
//Send an interested email
const interestedEmail = async (req, res) => {
  try {
    const { fullName, email, sessionTime, link, sessionCreator, title } =
      req.body;
    // Call the service function to send email
    const result = await emailServices.interestedEmail(
      fullName,
      email,
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

module.exports = {
  interestedEmail,
};
