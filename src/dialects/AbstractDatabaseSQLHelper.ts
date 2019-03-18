import { GeneratedTable, ColumnType, GeneratedQuery } from "../generator/config";
import { map } from "lodash";
import { IDatabaseSQLHelper } from "./IDatabaseSQLHelper";
import * as faker from "faker";

export abstract class AbstractDatabaseSQLHelper implements IDatabaseSQLHelper {

  generateCreateTableSQL(table: GeneratedTable): string {
    return `CREATE TABLE IF NOT EXISTS ${table.tableName} ( ${map(table.columns, c => `${c.columnName} ${c.columnType}`).join(",")} );`;
  }

  abstract generateSelectQuery(table: GeneratedQuery): string;

  generateInsertSQL(table: GeneratedTable): string {
    const tName = table.tableName;
    const values = this._generateTableValues(table);
    return `INSERT into ${tName} VALUES (${values.join(",")});`;
  }

  private _generateTableValues(table: GeneratedTable): any[] {
    return map(table.columns, c => {
      switch (c.columnType) {
        case ColumnType.INTEGER:
          return faker.random.number(Number.MAX_SAFE_INTEGER);
        case ColumnType.VARCHAR_32:
          return `"${faker.random.uuid()}"`;
        case ColumnType.TINYINT:
          return faker.random.number(8);
        case ColumnType.VARCHAR_255:
          return `"${faker.random.words(3)}"`;
        case ColumnType.VARCHAR_10240:
          return `"${faker.random.words(10)}"`;
        default:
          return faker.random.word();
      }
    });
  }
}
