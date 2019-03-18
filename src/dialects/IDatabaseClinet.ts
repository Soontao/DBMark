import { DBUrlObject } from './../utils/url_parser';

export interface IDatabaseClient {
  /**
   * connect to database
   */
  connect(url: string): Promise<boolean>;
  /**
   * check connection is alive
   */
  isAlive(): Promise<boolean>;
  /**
   * disconnect from database
   */
  destroy(): Promise<boolean>;
  /**
   * query from db
   */
  query(sql: string): Promise<Array<Object>>;
  /**
     * exec sql
     *
     * @throws error if error happened
     * @param {string} sql
     * @returns {Promise<void>}
     */
  exec(sql: string): Promise<void>;
}
