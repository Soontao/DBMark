
import { AbstractDatabaseClient } from '../base';

export class HDBDatabaseClient extends AbstractDatabaseClient {

  private db;

  async connect(url: string): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async isAlive(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async destroy(): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  async query(sql: string): Promise<Object[]> {
    throw new Error("Method not implemented.");
  }

  async exec(sql: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

}