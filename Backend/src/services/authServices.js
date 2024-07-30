const jwt = require("jsonwebtoken");
const helper = require("../helper/helper");
const executeQuery = require("../config/db_config");
const bcrypt = require("bcrypt");
const saltRounds = 10;
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
      const token = jwt.sign({ email: email, id: user[0].id }, SECRET_KEY, {
        expiresIn: "10h",
      });

      return { success: true, token: token, id: user[0].id };
    } else {
      return { success: false, message: "Invalid credentials" };
    }
  } catch (error) {
    console.error("Error while logging in:", error.message);
    throw new Error("Error while logging in");
  }
};

const verifyToken = (token, id) => {
  try {
    console.log("token");
    console.log(token);
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log(decoded.id);
    if (decoded.id == id) {
      return { success: true, message: "User Verified" };
    } else {
      return {
        success: false,
        message: "Token does not match the provided ID",
      };
    }
  } catch (error) {
    return { success: false, message: "Failed to authenticate token" };
  }
};
const resetPassword = async (email, changedPassword) => {
  try {
    const user = await helper.userExist(email);
    if (user.length === 0) {
      return false;
    }

    const hashPassword = await bcrypt.hash(changedPassword, saltRounds);
    const query = `UPDATE user SET password=? where email=?`;
    const result = await executeQuery(query, [hashPassword, email]);
    return result;
  } catch (err) {
    throw new Error("Error updating Password: " + err.message);
  }
};
module.exports = {
  loginUser,
  verifyToken,
  resetPassword,
};
