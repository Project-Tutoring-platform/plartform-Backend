'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Course.hasOne(models.CoursePeriod, { foreignKey: 'periodId' })
    }
  }
  Course.init({
    week: DataTypes.INTEGER,
    date: DataTypes.DATE,
    isFinish: DataTypes.BOOLEAN,
    isReserve: DataTypes.BOOLEAN,
    periodId: DataTypes.INTEGER,
    teachId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Course',
    tableName: 'Courses',
    underscored: true
  })
  return Course
}
