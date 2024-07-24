const authService = require("../services/authServices");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.loginUser(email, password);

    if (result) {
      const token = result.token;

      console.log("inside return");
      console.log(result);

      res.status(200).json({ success: true, token: result });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyToken = (req, res, next) => {
  try {
    console.log("insiede verigy");
    // process.exit();
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
      // res.status(500).json({ success: true, message: result.success });
      next();
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
