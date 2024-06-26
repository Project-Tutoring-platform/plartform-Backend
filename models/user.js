'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      User.hasOne(models.Teacher, {
        foreignKey: 'userId',
        onDelete: 'CASCADE'
      })
      User.hasMany(models.Course, {
        foreignKey: 'userId'
      })
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    introduce: DataTypes.TEXT,
    leaningHours: DataTypes.INTEGER,
    isTeacher: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    underscored: true
  })
  return User
}
