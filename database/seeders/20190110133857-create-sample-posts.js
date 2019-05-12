'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: '커뮤니티 게시판을 위한 첫번째 샘플 데이터',
      contents: '이 데이터는 커뮤니티 게시판을 위한 첫번째 샘플 데이터입니다.',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: '커뮤니티 게시판을 위한 두번째 샘플 데이터',
      contents: '이 데이터는 커뮤니티 게시판을 위한 두번째 샘플 데이터입니다.',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }, {
      title: '커뮤니티 게시판을 위한 세번째 샘플 데이터',
      contents: '이 데이터는 커뮤니티 게시판을 위한 세번째 샘플 데이터입니다.',
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
