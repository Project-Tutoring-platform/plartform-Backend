const { Connector } = require('@google-cloud/cloud-sql-connector')
const { Sequelize } = require('@sequelize/core')

async function connect ({ instanceConnectionName, username, databaseName }) {
  const connector = new Connector()
  const clientOpts = await connector.getOptions({
    instanceConnectionName,
    isType: 'PUBLIC',
    authType: 'IAM'
  })

  const database = new Sequelize({
    dialect: 'mysql',
    username,
    database: databaseName,
    dialectOptions: {
      ...clientOpts
    }
  })

  await database.authenticate()

  return {
    database,
    async close () {
      await database.close()
      connector.close()
    }
  }
}

module.exports = {
  connect
}
