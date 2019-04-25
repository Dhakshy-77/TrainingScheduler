'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   return queryInterface.addColumn('Sessions', 'eventId', {
    type: Sequelize.INTEGER,
    references: {
      model: 'Events',
      key: 'id',
    },

    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.removeColumn('Sessions', 'eventId');
  }
};
