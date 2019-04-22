'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Comments', [{
      contents: '안녕하세요. 게시물 잘 보았습니다.',
      UserId: 1,
      PostId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      contents: '안녕하세요. 댓글을 하나 더 달아보았습니다.',
      UserId: 1,
      PostId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Comments', null, {});
  },
};
