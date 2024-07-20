const express = require("express");
const app = express();
const userRoutes = require("./src/routes/userRoute");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
