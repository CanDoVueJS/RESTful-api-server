'use strict';
const { User } = require('../../src/models/index');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(User.tableName, User.attributes, User.options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(User.tableName);
  },
};
