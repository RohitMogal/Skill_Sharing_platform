const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");

const UserInterest = sequelize.define(
  "UserInterest",
  {
    InterestId: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    UserId: {
      type: DataTypes.CHAR(36),
      allowNull: false,
      references: {
        model: User,
        key: "UserId",
      },
    },
    Interests: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    tableName: "UserInterest",
  },
);

UserInterest.associate = (models) => {
  UserInterest.belongsTo(models.User, { foreignKey: "UserId" });
  UserInterest.hasMany(models.Session, { foreignKey: "InterestId" });
};

module.exports = UserInterest;
