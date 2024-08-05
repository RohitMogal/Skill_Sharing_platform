const nodemailer = require("nodemailer");
require("dotenv").config();
// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendEmail = (email, subject, text) => {
  const mailOptions = {
    from: "rohitmogal445@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }

      resolve(info);
    });
  });
};

module.exports = { sendEmail };
