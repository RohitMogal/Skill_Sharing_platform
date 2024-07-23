const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const UserInterest = require("./userInterestModel");

const Session = sequelize.define(
  "Session",
  {
    SessionId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: "UserId",
      },
    },
    Description: {
      type: DataTypes.TEXT,
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Link: {
      type: DataTypes.STRING(255),
    },
    SessionImg: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    InterestId: {
      type: DataTypes.CHAR(36),
      references: {
        model: UserInterest,
        key: "InterestId",
      },
    },
    SessionRating: {
      type: DataTypes.DECIMAL(3, 2),
    },
    NumberOfRatings: {
      type: DataTypes.INTEGER,
    },
    SessionTime: {
      type: DataTypes.DATE,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "Sessions",
  },
);

Session.associate = (models) => {
  Session.belongsTo(models.User, { foreignKey: "UserId" });
  Session.belongsTo(models.UserInterest, { foreignKey: "InterestId" });
  Session.hasMany(models.Feedback, { foreignKey: "SessionId" });
};

module.exports = Session;
