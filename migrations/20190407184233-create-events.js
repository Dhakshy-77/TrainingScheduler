'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      /*userid: {
        type: Sequelize.INTEGER
      },*/
      eventName: {
        type: Sequelize.STRING
      },
      eventDt: {
        type: Sequelize.DATE
      },
      eventLoc: {
        type: Sequelize.STRING
      },
      eventDesc: {
        type: Sequelize.STRING
      },
      eventDuration: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};