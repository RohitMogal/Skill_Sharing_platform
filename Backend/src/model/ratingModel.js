const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Session = require("./sessionModel");

const Rating = sequelize.define(
  "Rating",
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
    Rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "Rating",
  },
);

Rating.associate = (models) => {
  Rating.belongsTo(models.User, { foreignKey: "UserId" });
  Rating.belongsTo(models.Session, { foreignKey: "SessionId" });
};

module.exports = Rating;
