const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const userRoutes = require("./src/routes/userRoute");
const sessionRoutes = require("./src/routes/sessionRoute");

// Middleware to parse JSON bodies
app.use(express.json());

// Use the session routes
app.use('/api', sessionRoutes);



// Enable file upload
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});