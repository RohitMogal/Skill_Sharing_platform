const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");
const bcrypt = require("bcrypt");
require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

const loginUser = async (email, password) => {
  try {
    const user = await helper.userExist(email);

    if (user.length === 0) {
      return { success: false, message: "User not found" };
    }

    const passwordHash = user[0].password;
    const passwordMatch = await bcrypt.compare(password, passwordHash);

    if (passwordMatch) {
      const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error while logging in:", error.message);
    throw new Error("Error while logging in");
  }
};

const verifyToken = (token) => {
  try {
    console.log("verifyinside");
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded);
    return { success: true };
  } catch (error) {
    return { success: false, message: "Failed to authenticate token" };
  }
};

module.exports = {
  loginUser,
  verifyToken,
};
