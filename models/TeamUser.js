const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const TeamUser = sequelize.define('TeamUser', {
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '', // Default role is empty
  },
});


module.exports = TeamUser;

