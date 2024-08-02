const paymentServices = require("../services/paymentServices");

//Function to create new Payment
const createPayment = async (req, res) => {
  try {
    const { SessionId, amount } = req.body;

    const result = await paymentServices.createPayment(
      req.headers.id,
      SessionId,
      amount,
    );

    if (result) {
      res.status(200).json({
        success: true,
        data: result,
        message: "Payment created successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        data: null,
        message: "Paymnet creation failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};
// Function to fet all Paymnets
const getPayment = async (req, res) => {
  try {
    const result = await paymentServices.getPayment();

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
        message: "List of Rating retrieval failed",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

//Get specific rating paymnet by id
const getPaymentById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await paymentServices.getPaymentById(id);

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
        message: "Payment not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: error.message,
    });
  }
};

module.exports = { createPayment, getPayment, getPaymentById };
