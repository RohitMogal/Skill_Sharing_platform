const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const User = require("./userModel");
const Session = require("./sessionModel");

const Payment = sequelize.define(
  "Payment",
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
    Amount: {
      type: DataTypes.DECIMAL(7, 2),
      allowNull: false,
    },
    CreatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    IsSuccess: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    orderid: {
      type: DataTypes.CHAR(40),
      allowNull: false,
      unique: true,
    },
  },
  {
    timestamps: false,
    tableName: "Payment",
  },
);

Payment.associate = (models) => {
  Payment.belongsTo(models.User, { foreignKey: "UserId" });
  Payment.belongsTo(models.Session, { foreignKey: "SessionId" });
};

module.exports = Payment;
