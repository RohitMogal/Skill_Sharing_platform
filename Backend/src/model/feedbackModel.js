const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Session = require("./sessionModel");

const Feedback = sequelize.define(
  "Feedback",
  {
    FeedbackId: {
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
    SessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Session,
        key: "SessionId",
      },
    },
    FeedbackComment: {
      type: DataTypes.TEXT,
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
    tableName: "Feedback",
  },
);

Feedback.associate = (models) => {
  Feedback.belongsTo(models.User, { foreignKey: "UserId" });
  Feedback.belongsTo(models.Session, { foreignKey: "SessionId" });
};

module.exports = Feedback;
