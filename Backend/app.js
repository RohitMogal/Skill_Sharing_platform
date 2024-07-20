const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

// Enable file upload
app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
