const express = require("express");
const app = express();
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const interestMasterRoute = require("./src/routes/interestMasterRoute");
const sessionRoutes = require("./src/routes/sessionRoute");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");

const sequelize = require("./src/config/sequelize");
const User = require("./src/model/userModel");
const InterestMaster = require("./src/model/interestMasterModel");
const UserInterest = require("./src/model/userInterestModel");
const Session = require("./src/model/sessionModel");
const Feedback = require("./src/model/feedbackModel");
const Rating = require("./src/model/ratingModel");


const models = {
    User,
    InterestMaster,
    UserInterest,
    Session,
    Feedback,
    Rating,
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
app.use("/auth", authRoutes);
app.use("/interestMaster", interestMasterRoute);
app.use("/session", sessionRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/rating", ratingRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});