const express = require("express");
const app = express();
const sequelize = require("./src/config/sequelize");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const sessionRoutes = require("./src/routes/sessionRoute");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const authRoutes = require("./src/routes/authRoutes");
const interestMasterRoute = require("./src/routes/interestMasterRoute");
const userInterestRoute = require("./src/routes/userInterestRoute");
const ratingRoute = require("./src/routes/ratingRoutes");
const { sendEmail } = require("./src/services/email.service");
const User = require("./src/model/userModel");
const InterestMaster = require("./src/model/interestMasterModel");
const UserInterest = require("./src/model/userInterestModel");
const Session = require("./src/model/sessionModel");
const Feedback = require("./src/model/feedbackModel");
const Rating = require("./src/model/ratingModel");

const models = {
  User,
  Session,
  UserInterest,
  Feedback,
  InterestMaster,
  Rating,
};

async function createTables() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database & tables created!");
  } catch (error) {
    console.error("Unable to create tables:", error);
  }
}

app.use(cors());
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// createTables();

// //////////////////////////////////////

// const { format } = require("date-fns-tz");

// // Function to format the date and time in UTC for MySQL
// const formatDateTimeForMySQL = (date) => {
//   return format(date, "yyyy-MM-dd HH:mm:ss", { timeZone: "UTC" });
// };

// // Example usage
// const now = new Date("2074-07-24T07:24:28.000Z");
// const formattedDateTime = formatDateTimeForMySQL(now);
// console.log(formattedDateTime); // Output: 2074-07-24 07:24:28

sendEmail(
  "rohitmogal45@gmail.com",
  "Welcome Skill Sharing",
  "Your session time will be arranged soon",
);
// /////////////////////////

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/session", sessionRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/auth", authRoutes);
app.use("/interestMaster", interestMasterRoute);
app.use("/userInterest", userInterestRoute);
app.use("/rating", ratingRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
