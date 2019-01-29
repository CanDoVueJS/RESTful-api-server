'use strict';
const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@candovue.com',
      password: bcrypt.hashSync('admin123'),
      name: 'Admin',
      isAdmin: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
