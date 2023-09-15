const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
//const TeamUser = require('./TeamUser');
const Team = require('./Team');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 50], // Adjust the length validation as needed
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 100], // Adjust the length validation as needed
    },
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user', // Default role is 'user'
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = User;

