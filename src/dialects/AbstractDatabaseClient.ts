import { IDatabaseClient } from ".";

export abstract class AbstractDatabaseClient implements IDatabaseClient {
  abstract connect(url: string): Promise<boolean>;
  abstract isAlive(): Promise<boolean>;
  abstract destroy(): Promise<boolean>;
  abstract query(sql: string): Promise<Object[]>;
  abstract exec(sql: string): Promise<void>;
}
