import { DatabaseConfig, GeneratedDataBase, GeneratedTable } from "./config";

import * as faker from "faker";
import { generateArray } from "../utils/range";

export class DatabaseConfigGenerator {

  static generateDatabase(c: DatabaseConfig): GeneratedDataBase {

    var rt: GeneratedDataBase
    rt.databaseName = faker.random.word()
    rt.tables = []
    rt.queries = []
    rt.tables = generateArray(1, c.maxColumnsCount, c.tablesCount).map((columnCount,idx) => {
      var t: GeneratedTable
      // please ensure the table name is unique
      t.tableName = `t_${idx}`
      return t
    })
    return rt

  }

}