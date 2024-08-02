const express = require("express");
const cron = require("node-cron");
const app = express();
const sequelize = require("./src/config/sequelize");
const cors = require("cors");
const reminder = require("./src/services/email.service");
const bodyParser = require("body-parser");

// Import your routes
const userRoutes = require("./src/routes/userRoutes");
const sessionRoutes = require("./src/routes/sessionRoute");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const authRoutes = require("./src/routes/authRoutes");
const interestMasterRoute = require("./src/routes/interestMasterRoute");
const userInterestRoute = require("./src/routes/userInterestRoute");
const ratingRoute = require("./src/routes/ratingRoutes");
const emailRoute = require("./src/routes/emailRoutes");
const requestRoute = require("./src/routes/requestRoute");
const paymentRoute = require("./src/routes/paymentRoutes");

// Import your models
const User = require("./src/model/userModel");
const InterestMaster = require("./src/model/interestMasterModel");
const UserInterest = require("./src/model/userInterestModel");
const Session = require("./src/model/sessionModel");
const Feedback = require("./src/model/feedbackModel");
const Rating = require("./src/model/ratingModel");
const Request = require("./src/model/requestModel");
const Payment = require("./src/model/paymentModel");

const models = {
  User,
  Session,
  UserInterest,
  Feedback,
  InterestMaster,
  Rating,
  Request,
  Payment,
};

// Function to create tables
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
  optionsSuccessStatus: 200,
};

// Uncomment if you want to create tables on server start
// createTables();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define your routes
app.use("/user", userRoutes);
app.use("/session", sessionRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/auth", authRoutes);
app.use("/interests", interestMasterRoute);
app.use("/userInterest", userInterestRoute);
app.use("/rating", ratingRoute);
app.use("/email", emailRoute);
app.use("/request", requestRoute);
app.use("/payment", paymentRoute);

// Add a cron job to run every minute
// cron.schedule("* * * * *", () => {
//   reminder.remidnderEmail();
//   console.log("Running a task every minute");
//   // Add your task logic here
// });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
