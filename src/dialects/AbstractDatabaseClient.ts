import { IDatabaseClient } from "./IDatabaseClinet";
import { DBUrlObject } from "../utils/url_parser";


export abstract class AbstractDatabaseClient implements IDatabaseClient {
  abstract connect(url: string): Promise<boolean>;
  abstract isAlive(): Promise<boolean>;
  abstract destroy(): Promise<boolean>;
  abstract query(sql: string): Promise<Object[]>;
  abstract exec(sql: string): Promise<void>;
}
