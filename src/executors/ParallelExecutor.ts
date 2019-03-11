import { IExecutor } from "./base";

/**
 * ParallelExecutor
 */
export class ParallelExecutor implements IExecutor {

  run(i: Iterable<import("./base").RunCase>): Promise<import("./base").RunResult[]> {
    throw new Error("Method not implemented.");
  }

}
