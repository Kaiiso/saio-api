'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    UserId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    UUID: DataTypes.INTEGER,
    Surname: DataTypes.STRING,
    Name: DataTypes.STRING,
    Password: DataTypes.STRING,
    Establishment: DataTypes.STRING,
    Timezone: DataTypes.STRING,
    Email: DataTypes.STRING,
    DisplayName: DataTypes.STRING,
    AvatarPath: DataTypes.STRING
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
  };
  return Teacher;
};