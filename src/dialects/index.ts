
import { SQLiteDatabaseClient } from './sqlite';
import { parseConnectionURL } from '../utils';
import { IDatabaseClient } from "./IDatabaseClinet";
import { Pool } from "generic-pool";
import { PoolWrapper } from './PoolWrapper';
import { IDatabaseSQLHelper } from './IDatabaseSQLHelper';
import { trimEnd } from "lodash";

class NotSupportDatabase extends Error { }

export { SQLiteDatabaseClient, IDatabaseSQLHelper, IDatabaseClient as IDatabaseClinet }

/**
 * create database connection
 * 
 * @param {string} type database type
 * @param {string} url
 */
export const createDBConnection = async (url: string): Promise<IDatabaseClient> => {
  const options = parseConnectionURL(url)
  var client;
  try {
    client = require(`./${(options.type)}`).default
  } catch (error) {
    throw new NotSupportDatabase(`Not supported database: ${options.type} with url ${url}`)
  }

  const c = new client()
  await c.connect(url)
  return c

}

/**
 * create connection pool
 * 
 * @param url connection url
 * @param min min pool size
 * @param max max pool size
 * @param releaseAfterSeconds relase after seconds
 */
export const createDBPool = (url: string, min = 5, max = 100, releaseAfterSeconds = 60): PoolWrapper => {
  const info = parseConnectionURL(url);
  const pool = new Pool({
    name: `${info.type} connection pool`,
    min,
    max,
    create: async cb => {
      try {
        const conn = await createDBConnection(url)
        cb(null, conn)
      } catch (error) {
        cb(error, null)
      }
    },
    destroy: (c: IDatabaseClient) => { c.destroy() },
    idleTimeoutMillis: releaseAfterSeconds * 1000,
  })
  return new PoolWrapper(pool)
}