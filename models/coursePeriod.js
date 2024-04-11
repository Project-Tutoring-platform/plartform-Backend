'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class CoursePeriod extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      CoursePeriod.belongsTo(models.Course, { foreignKey: 'periodId' })
    }
  }
  CoursePeriod.init({
    startTime: DataTypes.TIME,
    endTime: DataTypes.TIME,
    isOneHour: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'CoursePeriod',
    tableName: 'CoursePeriods',
    underscored: true
  })
  return CoursePeriod
}
