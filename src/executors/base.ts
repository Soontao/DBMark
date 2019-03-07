
/**
 * ExecuteResponse Interface
 */
export interface IExecuteResponse {

}

export enum SQLType {
  /**
   * Modeling
   */
  DDL,
  /**
   * Query
   */
  DQL,
}

export interface RunCase {

  /**
   * the sql content
   */
  sql: string;

  /**
   * the sql type
   */
  sqlType: SQLType;

  /**
   * for DQL sql, specific this function for check result
   * 
   * for DDL sql, this function will not be called
   */
  checkResult?: (rows: Array<any>) => boolean;

}

export interface RunResult {

  /**
   * original run case
   */
  runCase: RunCase;

  /**
   * start run
   */
  timeStart: Date;

  /**
   * end run
   */
  timeEnd: Date;

  /**
   * success or not
   */
  success: boolean;

  /**
   * data will be cut off
   */
  result: Error | Array<any>;

}

/**
 * Executor Interface
 */
export interface IExecutor {

  run(i: Iterable<RunCase>): Promise<Iterable<RunResult>>;

}