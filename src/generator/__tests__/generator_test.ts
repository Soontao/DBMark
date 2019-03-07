import { GeneratedDataBase, ColumnType } from "../config";
import { DatabaseDataGenertor } from './../generator';


describe('generator test case', () => {

  test('should generate sql for one table', () => {
    const config: GeneratedDataBase = {
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
          rowsCount: 1000,
          insertSQLTemplate: 'INSERT INTO (c_1, c_2, c_3) VALUES ("%s", %d, "%s");'
        }

      ]
    }
    const generator = new DatabaseDataGenertor(config)

    expect(Array.from(generator).length).toBe(1000)

  });

  test('should generate sql for multi table', () => {

    const t_1_count = 100;

    const t_2_count = 432;

    const config: GeneratedDataBase = {
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
          insertSQLTemplate: 'INSERT INTO (c_1, c_2, c_3) VALUES ("%s", %d, "%s");'
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
          rowsCount: t_2_count,
          insertSQLTemplate: 'INSERT INTO (t_2_c_4, t_2_c_5, t_2_c_6) VALUES ("%s", %d, "%s");'
        }

      ]
    }
    const generator = new DatabaseDataGenertor(config)

    expect(Array.from(generator).length).toBe(t_1_count + t_2_count)

  });

});