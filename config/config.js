module.exports = {
  production: {
    username: process.env.GOOGLE_CLOUD_SQL_DB_USERNAME,
    password: process.env.GOOGLE_CLOUD_SQL_DB_SECRET,
    host: process.env.GOOGLE_CLOUD_SQL_DB_HOST,
    database: process.env.GOOGLE_CLOUD_SQL_DB_DATABASE,
    dialect: 'mysql'
  },
  development: {
    username: 'root',
    password: 'password',
    host: '127.0.0.1',
    database: 'platform',
    dialect: 'mysql'
  }
}
