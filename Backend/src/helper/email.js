const nodemailer = require("nodemailer");

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohitmogal445@gmail.com",
    pass: "vvquvcbcnskbabng",
  },
});

const sendEmail = (email, subject, text) => {
  console.log("Preparing to send email");

  const mailOptions = {
    from: "rohitmogal445@gmail.com",
    to: email,
    subject: subject,
    text: text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending error:", error);
        return reject(error);
      }
      console.log("Email sent:", info.response);
      resolve(info);
    });
  });
};

module.exports = { sendEmail };
