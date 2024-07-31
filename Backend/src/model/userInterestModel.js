const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");

const UserInterest = sequelize.define(
  "UserInterest",
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
    Interests: {
      type: DataTypes.INTEGER,
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
    tableName: "UserInterest",
  },
);

UserInterest.associate = (models) => {
  UserInterest.belongsTo(models.User, { foreignKey: "UserId" });
};

module.exports = UserInterest;
