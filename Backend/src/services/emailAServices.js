const nodemailer = require("nodemailer");
// const { Email, Password } = require("../config/env")
const userServices = require("../services/userService");

const { email, password } = req.body;

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rohitmogal445@gmail.com",
        pass: "vvquvcbcnskbabng",
    },
});

const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: "rohitmogal445@gmail.com",
        to: email,
        subject: "Welcome Skill Sharing",
        text: " Your Seesion Time will arrange soon",
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