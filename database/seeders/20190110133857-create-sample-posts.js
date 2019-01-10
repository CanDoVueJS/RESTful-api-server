'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Posts', [{
      title: '테스트 포스트1 입니다',
      contents: '테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 테스트 1 ',
      userId: 1,
    }, {
      title: '테스트 포스트2 입니다',
      contents: 'test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 test 2 ',
      userId: 1,
    }, {
      title: '테스트 포스트3 입니다',
      contents: '테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 테스트 3 ',
      userId: 1,
    }]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Posts', null, {});
  },
};
