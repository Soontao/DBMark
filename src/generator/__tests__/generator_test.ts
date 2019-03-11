import { GeneratedDataBase, ColumnType } from "../config";
import { DatabaseDataGenertor } from './../generator';
import { SQLiteDatabaseSQLHelper } from "../../dialects/sqlite";
import { createDBConnection } from './../../dialects/index';
import { SequentialExecutor } from './../../executors/SequentialExecutor';


describe('generator test case', () => {

  const test_config_1_row_count = 523

  const test_config_1: GeneratedDataBase = {
    databaseName: "test",
    tables: [
      {
        tableName: "t_1",
        columns: [
          {
            columnName: "c_1",
            columnType: ColumnType.VARCHAR_255
          },
          {
            columnName: "c_2",
            columnType: ColumnType.INTEGER
          },
          {
            columnName: "c_3",
            columnType: ColumnType.VARCHAR_10240
          }
        ],
        rowsCount: test_config_1_row_count,
      }

    ]
  }

  test('should generate sql for one table', () => {

    const generator = new DatabaseDataGenertor(test_config_1, new SQLiteDatabaseSQLHelper())

    expect(Array.from(generator).length).toBe(test_config_1_row_count)

  });

  test('should generate sql for multi table', () => {

    const t_1_count = 100;

    const t_2_count = 432;

    const config: GeneratedDataBase = {
      databaseName: "test",
      tables: [
        {
          tableName: "t_1",
          columns: [
            {
              columnName: "c_1",
              columnType: ColumnType.VARCHAR_255
            },
            {
              columnName: "c_2",
              columnType: ColumnType.INTEGER
            },
            {
              columnName: "c_3",
              columnType: ColumnType.VARCHAR_10240
            }
          ],
          rowsCount: t_1_count,
        },
        {
          tableName: "t_2",
          columns: [
            {
              columnName: "t_2_c_4",
              columnType: ColumnType.VARCHAR_255
            },
            {
              columnName: "t_2_c_5",
              columnType: ColumnType.INTEGER
            },
            {
              columnName: "t_2_c_6",
              columnType: ColumnType.VARCHAR_10240
            }
          ],
          rowsCount: t_2_count
        }

      ]
    }

    const generator = new DatabaseDataGenertor(config, new SQLiteDatabaseSQLHelper())

    expect(Array.from(generator).length).toBe(t_1_count + t_2_count)

  });

  test('should setup & generate data with seq executor', async () => {

    const helper = new SQLiteDatabaseSQLHelper()
    const client = await createDBConnection("sqlite:memory")
    const executor = new SequentialExecutor(client)

    expect(client.isAlive()).toBeTruthy()

    await client.exec(helper.generateCreateTableSQL(test_config_1.tables[0]))

    const generator = new DatabaseDataGenertor(test_config_1, helper)

    await executor.run(generator)

    const queryResult = await client.query(`select count(*) as count from ${test_config_1.tables[0].tableName};`)

    expect(queryResult[0]["count"]).toEqual(test_config_1_row_count)


  });

});