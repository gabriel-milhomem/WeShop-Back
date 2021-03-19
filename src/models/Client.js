const { Sequelize } = require('sequelize');
const sequelize = require('../utils/database');

class Client extends Sequelize.Model {}

Client.init(
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthDate: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'client'
  }
);

module.exports = Client;
