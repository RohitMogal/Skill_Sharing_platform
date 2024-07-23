const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define(
  "User",
  {
    UserId: {
      type: DataTypes.CHAR(36),
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    FullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    Password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    IsDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    UpdatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: "User",
  },
);

User.associate = (models) => {
  User.hasMany(models.UserInterest, { foreignKey: "UserId" });
  User.hasMany(models.Session, { foreignKey: "UserId" });
  User.hasMany(models.Feedback, { foreignKey: "UserId" });
};

module.exports = User;
