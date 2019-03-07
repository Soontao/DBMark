
export enum ColumnType {
  VARCHAR_32 = "VARCHAR(32)",
  VARCHAR_255 = "VARCHAR(255)",
  VARCHAR_10240 = "VARCHAR(10240)",
  TINYINT = "TINYINT",
  INTEGER = "INTEGER",
  INTEGER_128 = "INTEGER(128)",
  DATE = "DATE",
  DATETIME = "DATETIME",
}

/**
 * Table Config
 */
export interface TableConfig {

  columnsCount: number;

  indexsCount: number;

  rowsCount: number;

}

/**
 * Database Config
 */
export interface DatabaseConfig {

  tablesCount: number;

  maxColumnsCount: number;

  maxRowsCount: number;

}

export interface GeneratedDataBase {

  tables: GeneratedTable[];

  queries?: GeneratedQuery[];

}

export interface GeneratedTable {

  /**
   * table name
   */
  tableName: string;
  /**
   * columns
   */
  columns: GeneratedColumn[];
  /**
   * template for insert sql
   */
  insertSQLTemplate: string;
  /**
   * the rows' count of the table should have
   */
  rowsCount: number;

}

export interface GeneratedColumn {

  columnName: string;
  columnType: ColumnType;

}

export interface GeneratedQuery {

  queryName: string
  joinTables: GeneratedTable[]

}