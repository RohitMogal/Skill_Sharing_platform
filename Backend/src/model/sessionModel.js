const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");

const Session = sequelize.define(
  "Session",
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
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Link: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Interests: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Img: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Rating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: true,
    },
    NumberOfRating: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    SessionTime: {
      type: DataTypes.DATE,
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
    tableName: "Session",
  },
);

Session.associate = (models) => {
  Session.belongsTo(models.User, { foreignKey: "UserId" });
  Session.hasMany(models.Feedback, { foreignKey: "SessionId" });
  Session.hasMany(models.Rating, { foreignKey: "SessionId" });
};

module.exports = Session;
