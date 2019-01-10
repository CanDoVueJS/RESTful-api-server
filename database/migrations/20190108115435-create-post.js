'use strict';
const { Post } = require('../../src/models/index');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(Post.tableName, Post.attributes, Post.options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable(Post.tableName);
  },
};
