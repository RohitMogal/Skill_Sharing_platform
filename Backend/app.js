const express = require("express");
const app = express();
const userRoutes = require("./src/routes/userRoute");
const sequelize = require("./src/config/sequelize");
const User = require("./src/model/userModel");
const InterestMaster = require("./src/model/interestMasterModel");
const UserInterest = require("./src/model/userInterestModel");
const Session = require("./src/model/sessionModel");
const Feedback = require("./src/model/feedbackModel");

const models = {
  User,
  InterestMaster,
  UserInterest,
  Session,
  Feedback,
};

function createTables() {
  Object.keys(models).forEach((modelName) => {
    if ("associate" in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  // Sync models with the database
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("Database & tables created!");
    })
    .catch((err) => {
      console.error("Unable to create tables, shutting down...", err);
      process.exit(1);
    });
}
createTables();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
