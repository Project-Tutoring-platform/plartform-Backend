module.exports = {
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.INSTANCE_HOST,
    database: process.env.DB_NAME,
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
