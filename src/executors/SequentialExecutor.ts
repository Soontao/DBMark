import { IExecutor, SQLType, RunResult, RunCase } from "./base";
import { IDatabaseClient } from "../dialects";
import { getLogger, Logger } from "log4js";

/**
 * SequentialExecutor
 */
export class SequentialExecutor implements IExecutor {

  private conn: IDatabaseClient;

  private logger = getLogger("SequentialExecutor")

  constructor(conn: IDatabaseClient) {
    this.conn = conn;
  }

  async run(i: Iterable<RunCase>): Promise<Iterable<RunResult>> {
    const rt: RunResult[] = []
    for (const runCase of i) {
      const runCaseResult: RunResult = {
        runCase,
        timeStart: new Date(),
        timeEnd: null,
        success: true,
        result: null,
      }
      try {
        switch (runCase.sqlType) {
          case SQLType.DDL:
          case SQLType.DML:
            await this.conn.exec(runCase.sql)
            break;
          case SQLType.DQL:
            runCaseResult.result = await this.conn.query(runCase.sql)
            if (runCase.checkResult) {
              runCaseResult.success = runCase.checkResult(runCaseResult.result)
            }
            break;
          default:
            throw new Error(`Not support sql type: ${runCase.sqlType}`)
        }
      } catch (error) {
        // catch error
        runCaseResult.success = false
        runCaseResult.result = error
        this.logger.error(error)
        // log here
      }
      runCaseResult.timeEnd = new Date() // assign end date
      rt.push(runCaseResult)
    }
    return rt
  }

}