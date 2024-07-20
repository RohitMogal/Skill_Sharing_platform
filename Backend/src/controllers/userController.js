const userServices = require("../services/userService");

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { fullName, email, password } = req.body;
    const result = await userServices.createUser(fullName, email, password);
    if (result) {
      res.status(200).json({ message: "User created sucessfully" });
    } else {
      res.status(400).json({ error: "User creation failed" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
