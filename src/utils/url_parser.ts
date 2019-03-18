import { URL, URLSearchParams } from "url";
import { trimEnd } from "lodash";


/**
 * data base url information
 */
export interface DBUrlObject {

  /**
   * database type
   */
  type: string;
  /**
   * user name
   */
  user?: string;
  /**
   * password
   */
  password?: string;
  /**
   * path
   */
  path?: string;
  /**
   * hostname
   */
  host: string;
  /**
   * database port
   */
  port: number;
  /**
   * addtional parameters
   */
  parameters?: URLSearchParams

}


export const parseConnectionURL = (url: string): DBUrlObject => {
  const u = new URL(url)
  const rt: DBUrlObject = {
    type: trimEnd(u.protocol, ":"),
    host: u.hostname,
    port: parseInt(u.port),
    parameters: u.searchParams,
    path: u.pathname,
  }
  return rt;
}