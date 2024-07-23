const authService = require("../services/authServices");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    if (result.success) {
      res.status(200)({ success: true, token: result.token });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.slice(7);
    console.log(token);
    if (!token) {
      return res
        .status(403)
        .json({ success: false, message: "No token provided" });
    }

    const result = authService.verifyToken(token);
    console.log(result);
    // process.exit();
    if (result.success) {
      res.status(200).json({ success: true, message: "User is verified!" });
    } else {
      res.status(500).json({ success: false, message: result.message });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  login,
  verifyToken,
};
