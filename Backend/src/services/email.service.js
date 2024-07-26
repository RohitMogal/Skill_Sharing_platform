const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rohitmogal445@gmail.com",
    pass: "vvquvcbcnskbabng", // Use an App Password if you have 2-Step Verification enabled
  },
});

const sendEmail = (to, subject, text) => {
  const mailOptions = {
    from: "rohitmogal445@gmail.com",
    to,
    subject,
    text,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return reject(error);
      }
      console.log(info);
      resolve(info);
    });
  });
};

module.exports = { sendEmail };
