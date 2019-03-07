
import { SQLiteDatabaseClient } from './sqlite';

class NotSupportDatabase extends Error { }

export { SQLiteDatabaseClient }

/**
 * create database connection
 * 
 * @param {string} type database type
 * @param {string} url
 * @returns {DatabaseClient} 
 */
export const createConnection = (type = "sqlite", url) => {
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

