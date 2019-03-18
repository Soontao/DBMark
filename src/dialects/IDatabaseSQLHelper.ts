import { GeneratedTable, GeneratedQuery } from "../generator/config";

export interface IDatabaseSQLHelper {
  /**
   * generate a random insert sql
   */
  generateInsertSQL(table: GeneratedTable): string;
  /**
   * generate table create sql
   * @param table
   */
  generateCreateTableSQL(table: GeneratedTable): string;
  /**
   * generate query
   * @param table
   */
  generateSelectQuery(table: GeneratedQuery): string;
}
