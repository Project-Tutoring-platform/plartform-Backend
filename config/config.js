module.exports = {
  production: {
    username: 'root',
    password: process.env.GOOGLE_CLOUD_SQL_DB_SECRET,
    host: '104.199.227.229',
    database: 'platform-DB',
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
