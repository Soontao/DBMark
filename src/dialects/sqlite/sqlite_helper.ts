import { AbstractDatabaseSQLHelper } from "../AbstractDatabaseSQLHelper";
import { GeneratedQuery } from "../../generator/config";

/**
 * sqlite data base sql helper
 */
export class SQLiteDatabaseSQLHelper extends AbstractDatabaseSQLHelper {

  generateSelectQuery(table: GeneratedQuery): string {
    throw new Error("Method not implemented.");
  }

}