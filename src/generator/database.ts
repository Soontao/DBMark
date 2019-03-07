import { GeneratedTable } from "./table";
import { DatabaseClinet } from '../dialects/base';


export const createDatabase = (conn, tables = [{ columns: 100, rows: 100000 }, { columns: 50, rows: 100000 }]) => {

}

export const loadDatabaseConfig = (conn, config) => {

}

export class GeneratedDatabase {

  private conn: DatabaseClinet;
  private tables: GeneratedTable[];

  constructor(conn) {
    this.conn = conn
  }

  getTables(): Array<GeneratedTable> {
    return this.tables
  }

}
