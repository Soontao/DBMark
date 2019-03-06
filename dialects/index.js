
const { SQLiteDatabaseClient } = require("./sqlite")
// eslint-disable-next-line no-unused-vars
const { DatabaseClient } = require("./base")

class NotSupportDatabase extends Error { }

/**
 * create database connection
 * 
 * @param {string} type database type
 * @param {string} url
 * @returns {DatabaseClient} 
 */
const createConnection = (type = "sqlite", url) => {
  switch (type) {
  case "sqlite":
  {
    const c = new SQLiteDatabaseClient()
    c.connect(url)
    return c
  }
  default:
    throw new NotSupportDatabase(`Not supported database: ${type}`)
  }
}

module.exports = { SQLiteDatabaseClient, createConnection }
