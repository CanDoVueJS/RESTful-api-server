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
      contents: '안녕하세요. 첫번째 게시글에 대한 첫번째 댓글입니다.',
      UserId: 1,
      PostId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      contents: '안녕하세요. 첫번째 게시글에 대한 두번째 댓글입니다.',
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
