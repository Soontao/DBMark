
import { RunCase, SQLType } from './../executors/base';
import { GeneratedDataBase } from './config';
import { IDatabaseSQLHelper } from '../dialects';

export class DatabaseDataGenertor implements Iterable<RunCase> {

  private _config: GeneratedDataBase;

  private _sqlHelper: IDatabaseSQLHelper;

  constructor(config: GeneratedDataBase, sqlHelper: IDatabaseSQLHelper) {
    this._config = config
    this._sqlHelper = sqlHelper
  }

  [Symbol.iterator](): Iterator<RunCase> {

    var _currentTableIdx: number = 0;

    var _currentRow: number = 0;

    return {
      next: (): IteratorResult<RunCase> => {
        var done = false;

        const maxTableIndex = this._config.tables.length - 1;

        if (_currentTableIdx > maxTableIndex) {
          // out of table
          return {
            value: undefined,
            done: true
          }
        }

        const currentTable = this._config.tables[_currentTableIdx]
        const currentTableMaxRowsIdx = currentTable.rowsCount - 1;

        var value: RunCase = {
          sql: this._sqlHelper.generateInsertSQL(currentTable),
          sqlType: SQLType.DML,
          table: currentTable,
          rowIndex: _currentTableIdx
        }

        if (_currentRow == currentTableMaxRowsIdx) {
          // current table last row
          // set row index to zero
          _currentRow = 0
          _currentTableIdx += 1
        } else {
          // go to next row
          _currentRow += 1
        }

        return {
          value,
          done
        }

      }
    }
  }

}
