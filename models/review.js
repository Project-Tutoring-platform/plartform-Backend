'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Review.init({
    text: DataTypes.TEXT,
    point: DataTypes.INTEGER,
    isReview: DataTypes.BOOLEAN,
    courseId: DataTypes.INTEGER,
    teacherId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
    tableName: 'Reviews',
    underscored: true
  })
  return Review
}
