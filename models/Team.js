const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Team = sequelize.define('Team', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 50],
    },
  },
  category: {
    type: DataTypes.STRING,
    validate: {
      len: [0, 100],
    },
  },
});


module.exports = Team;

