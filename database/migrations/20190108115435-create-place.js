'use strict';
const { Place } = require('../../src/models/index');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(Place.tableName, Place.attributes, Place.options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(Place.tableName);
  },
};
