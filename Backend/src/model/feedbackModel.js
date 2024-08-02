const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Session = require("./sessionModel");

const Feedback = sequelize.define(
  "Feedback",
  {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: "Id",
      },
    },
    SessionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Session,
        key: "Id",
      },
    },
    FeedbackComment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
