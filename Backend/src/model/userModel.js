const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const User = sequelize.define(
    "User", {
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
        profilePic: {
            type: DataTypes.STRING(255),
            allowNull: true,
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
    }, {
        timestamps: false,
        tableName: "User",
    },
<<<<<<< HEAD
=======
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
    About: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    ProfilePic: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Rating: {
      type: DataTypes.INTEGER,
    },
    NumberOfRatings: {
      type: DataTypes.INTEGER,
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
>>>>>>> origin/Rohit-Branch-IM_(10666)_RM
);

User.associate = (models) => {
    User.hasMany(models.UserInterest, { foreignKey: "UserId" });
    User.hasMany(models.Session, { foreignKey: "UserId" });
    User.hasMany(models.Feedback, { foreignKey: "UserId" });
};

module.exports = User;