'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
    }
  }
  Admin.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admins',
    underscored: true
  })
  return Admin
}
