const authService = require("../services/authServices");
//Logs in a user with the provided email and password.
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);
    if (result.success == true) {
      const token = result.token;

      res.status(200).json(result);
    } else {
      res.status(401).json(result);
    }
  } catch (error) {
    console.error(error);
    res
      .status(error)
      .json({ success: false, message: "Internal server error" });
  }
};
//Verifies a token and calls the next middleware if valid.
const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.slice(7);
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    const result = authService.verifyToken(token, req.headers.id);
    // process.exit();
    if (result.success) {
      // res.status(500).json({ success: true, message: result.message });
      next();
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
//Resets a user's password.
const resetPassword = async (req, res) => {
  try {
    const { email, changedPassword } = req.body;
    const result = await authService.resetPassword(email, changedPassword);
    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Password updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Password update failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: "Internal Server Error!",
    });
  }
};
module.exports = {
  login,
  verifyToken,
  resetPassword,
};
