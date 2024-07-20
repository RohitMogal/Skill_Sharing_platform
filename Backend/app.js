const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const userRoutes = require("./src/routes/userRoute");

// Use routes
app.use("/users", userRoutes);
// Enable file upload
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
