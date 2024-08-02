const userServices = require("../services/userService");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const helper = require("../helper/helper");
// Validation schemas
const userValidation = Joi.object({
  fullName: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  profilePicture: Joi.string(),
  about: Joi.string().required(),
  interests: Joi.array().required(),
});

const createUser = async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        data: null,
        message: error.details[0].message,
      });
    }

    const userExist = await helper.userExist(req.body.email);
    console.log(userExist);
    if (userExist.length > 0) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const { fullName, email, password, profilePicture, about, interests } =
      req.body;

    const hashPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashPassword);

    const result = await userServices.createUser(
      fullName,
      email,
      hashPassword,
      profilePicture,
      about,
      interests,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "User created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User creation failed",
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

const getUser = async (req, res) => {
  try {
    const result = await userServices.getUser();

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Success",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "List retrieval failed",
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

const getUserById = async (req, res) => {
  try {
    const result = await userServices.getUserById(req.params.id);

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Success",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User not found",
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

const updateUser = async (req, res) => {
  try {
    // const { error } = userValidation.validate(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     success: false,
    //     data: null,
    //     message: bodyError.details[0].message,
    //   });
    // }
    const { fullName, profilePicture, about } = req.body;
    console.log(fullName, profilePicture, about);
    const result = await userServices.updateUser(
      req.params.id,
      fullName,

      profilePicture,
      about,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "User updated successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User update failed",
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

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userServices.deleteUser(id);

    if (result) {
      res.status(200).json({
        success: true,
        data: null,
        message: "User deleted successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "User deletion failed",
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

module.exports = { createUser, getUser, getUserById, updateUser, deleteUser };
