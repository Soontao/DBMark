
import { RunCase, SQLType } from './../executors/base';
import { GeneratedDataBase, GeneratedTable, ColumnType } from './config';
import { format } from "util";
import { map } from "lodash";
import * as faker from "faker";

export class DatabaseDataGenertor implements Iterable<RunCase> {

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
          sql: this.generteInsertSQL(currentTable),
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

  private _config: GeneratedDataBase;



  constructor(config: GeneratedDataBase) {
    this._config = config
  }

  private generteInsertSQL(table: GeneratedTable): string {
    return format(table.insertSQLTemplate, ...map(table.columns, c => {
      switch (c.columnType) {
        case ColumnType.INTEGER:
          return faker.random.number(Number.MAX_SAFE_INTEGER)
        case ColumnType.VARCHAR_32:
          return faker.random.uuid()
        case ColumnType.TINYINT:
          return faker.random.number(8)
        case ColumnType.VARCHAR_255:
          return faker.random.words(3)
        case ColumnType.VARCHAR_10240:
          return faker.random.words(10)
        default:
          return faker.random.word()
      }
    }))
  }



}
