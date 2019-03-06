/* eslint-disable no-unused-vars */

class NotImplementError extends Error { }

class DatabaseClient {

  /**
     * connect to server
     * 
     * @returns {Promise<boolean>}
     */
  async connect(url = "") {
    throw new NotImplementError(`can not connect to ${url}`)
  }

  /**
     * check connection is alive
     * 
     * @returns {Promise<boolean>}
     */
  async isAlive() {
    throw new NotImplementError()
  }

  /**
     * disconnect from database
     * 
     * @returns {Promise<boolean>}
     */
  async destroy() {
    throw new NotImplementError()
  }

  /**
     * query 
     * @param {string} sql 
     * @returns {Array<Object>}
     */
  async query(sql) {
    throw new NotImplementError()
  }

  /**
     * exec sql
     * 
     * @throws error if error happened
     * @param {string} sql 
     * @returns {Promise<void>}
     */
  async exec(sql) {
    throw new NotImplementError()
  }

}

module.exports = { DatabaseClient }