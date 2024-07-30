var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "aliza.jones@ethereal.email",
    pass: "uWuXASfzkHwt8jKJTY",
  },
});

var mailOptions = {
  from: "aliza.jones@ethereal.email",
  to: "fgt@yopmail.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

transporter.sendMail(mailOptions, function (error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
