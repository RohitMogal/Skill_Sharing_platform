const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Interest = sequelize.define(
  "Interest",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Interest: {
      type: DataTypes.STRING(255),
      allowNull: false,
      // unique: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "Interest",
  },
);

module.exports = Interest;
