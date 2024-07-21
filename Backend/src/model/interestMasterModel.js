const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const InterestMaster = sequelize.define(
  "InterestMaster",
  {
    InterestMasterId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Interest: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
    tableName: "InterestMaster",
  },
);

module.exports = InterestMaster;
