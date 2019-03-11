import { URL, URLSearchParams } from "url";
import { trimEnd } from "lodash";



interface DBUrlObject {

  type: string;
  user?: string;
  password?: string;
  path?: string;
  host: string;
  port: number;
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