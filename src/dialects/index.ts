
import { SQLiteDatabaseClient } from './sqlite';
import { parseConnectionURL } from '../utils';

class NotSupportDatabase extends Error { }

export { SQLiteDatabaseClient }

/**
 * create database connection
 * 
 * @param {string} type database type
 * @param {string} url
 * @returns {DatabaseClient} 
 */
export const createDBConnection = async (url) => {
  const options = parseConnectionURL(url)

  switch (options.type) {
    case "sqlite":
      {
        const c = new SQLiteDatabaseClient()
        switch (options.path) {
          case "memory":
            await c.connect(`:${options.path}:`)
            break;
          default:
            await c.connect(options.path)
            break;
        }
        return c
      }
    default:
      throw new NotSupportDatabase(`Not supported database: ${options.type} with url ${url}`)
  }
}

