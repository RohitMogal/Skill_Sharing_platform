const userServices = require("../services/userService");

const createUser = async (req, res) => {
  try {
    userServices.createUser();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser };
