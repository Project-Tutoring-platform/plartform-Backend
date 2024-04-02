'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Teacher.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Teacher.init({
    teachingStyle: DataTypes.TEXT,
    pointTotal: DataTypes.INTEGER,
    reviewTimes: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    courseLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Teacher',
    tableName: 'Teachers',
    underscored: true
  })
  return Teacher
}
