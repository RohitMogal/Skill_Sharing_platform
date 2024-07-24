const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Session = require("./sessionModel");

const Rating = sequelize.define(
  "Rating",
  {
    RatingId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: User,
        key: "UserId",
      },
    },
    SessionId: {
      type: DataTypes.INTEGER,
      defaultValue: false,
      references: {
        model: Session,
        key: "SessionId",
      },
    },
    Rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: "Rating",
  },
);
Rating.associate = (models) => {
  Rating.hasMany(models.User, { foreignKey: "UserId" });
  Rating.hasMany(models.Session, { foreignKey: "SessionId" });
};

module.exports = Rating;
