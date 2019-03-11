
/**
 * ColumnType enum
 */
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
 * Database Config
 */
export interface DatabaseConfig {

  /**
   * tables count
   */
  tablesCount: number;

  /**
   * max columns count of one table
   */
  maxColumnsCount: number;

  /**
   * max indexes count of one table
   */
  maxIndexsCount: number;

  /**
   * max data rows count of one table
   */
  maxRowsCount: number;

}

/**
 * GeneratedDataBase type
 */
export interface GeneratedDataBase {

  /**
   * database name
   */
  databaseName: string;

  /**
   * generated tables
   */
  tables: GeneratedTable[];

  queries?: GeneratedQuery[];

}

/**
 * GeneratedTable type
 */
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
   * the rows' count of the table should have
   */
  rowsCount: number;

}

/**
 * GeneratedColumn type
 */
export interface GeneratedColumn {

  /**
   * the column name
   */
  columnName: string;
  /**
   * the column type
   */
  columnType: ColumnType;

}

/**
 * GeneratedQuery type
 */
export interface GeneratedQuery {

  /**
   * query name
   */
  queryName: string;

  /**
   * joined table
   */
  joinTables: GeneratedTable[];

  /**
   * query SQL
   */
  queryString: string;

}