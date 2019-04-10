'use strict';
module.exports = (sequelize, DataTypes) => {
  const events = sequelize.define('events', {
    userid: DataTypes.INTEGER,
    eventName: DataTypes.STRING,
    eventDt: DataTypes.DATE,
    eventLoc: DataTypes.STRING,
    eventDesc: DataTypes.STRING,
    eventDuration: DataTypes.DATE
  }, {});
  events.associate = function(models) {
    // associations can be defined here
   
  /* models.Events.belongsTo(models.UserRoles, {
      foreignKey: 'userid',
      sourceKey: 'id',
    });*/
  };
  return events;
};
 