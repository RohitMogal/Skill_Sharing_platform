const express = require("express");
const app = express();
const sequelize = require("./src/config/sequelize");
const cors = require("cors");
const userRoutes = require("./src/routes/userRoutes");
const authRoutes = require("./src/routes/authRoutes");
const interestMasterRoute = require("./src/routes/interestMasterRoute");
const userInterestRoute = require("./src/routes/userInterestRoute");
const ratingRoute = require("./src/routes/ratingRoutes");
const emailRoute = require("./src/routes/emailRoutes");
const requestRoute = require("./src/routes/requestRoute");
const { sendEmail } = require("./src/helper/email");
const sessionRoutes = require("./src/routes/sessionRoute");
const feedbackRoutes = require("./src/routes/feedbackRoutes");
const ratingRoutes = require("./src/routes/ratingRoutes");
const paymentRouts = require("./src/routes/paymentRoutes");

const sequelize = require("./src/config/sequelize");
const User = require("./src/model/userModel");
const InterestMaster = require("./src/model/interestMasterModel");
const UserInterest = require("./src/model/userInterestModel");
const Session = require("./src/model/sessionModel");
const Feedback = require("./src/model/feedbackModel");
const Rating = require("./src/model/ratingModel");
const Request = require("./src/model/requestModel");
const Rating = require("./src/model/ratingModel");
const Payment = require("./src/model/paymentModel");

const models = {
    User,
    Session,
    UserInterest,
    Feedback,
    InterestMaster,
    Rating,
    Request,
    User,
    InterestMaster,
    UserInterest,
    Session,
    Feedback,
    Rating,
    Payment,
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
    optionsSuccessStatus: 200,
};
// createTables();
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

app.use("/user", userRoutes);
app.use("/session", sessionRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/interestMaster", interestMasterRoute);
app.use("/userInterest", userInterestRoute);
app.use("/rating", ratingRoute);
app.use("/email", emailRoute);
app.use("/request", requestRoute);
app.use("/session", sessionRoutes);
app.use("/feedback", feedbackRoutes);
app.use("/rating", ratingRoutes);
app.use("/payment", paymentRouts);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});