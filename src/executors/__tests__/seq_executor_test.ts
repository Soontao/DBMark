
import { SQLiteDatabaseClient } from '../../dialects/sqlite';
import { RunCase, SQLType } from '../base';
import { SequentialExecutor } from '../SequentialExecutor';

describe('Sequential Executor Test Suite', async () => {

  const conn = new SQLiteDatabaseClient()

  test('should connect to db', async () => {
    expect(await conn.connect(":memory:")).toBeTruthy()
  });

  test('should run cases & check result', async () => {

    const cases: RunCase[] = [
      {
        sql: "CREATE TABLE IF NOT EXISTS test ( id VARCHAR(32) PRIMARY KEY, v_text VARCHAR(255) );",
        sqlType: SQLType.DDL,
      },
      {
        sql: 'INSERT INTO test(id,v_text) VALUES ("bcb3766d5bea4d1dae8359539249c979","test text"); ',
        sqlType: SQLType.DDL,
      },
      {
        sql: 'SELECT * FROM test WHERE id = "bcb3766d5bea4d1dae8359539249c979";',
        sqlType: SQLType.DQL,
        checkResult: rows => rows.length == 1 && rows[0].v_text == "test text"
      }
    ]

    const executor = new SequentialExecutor(conn)

    const results = Array.from(await executor.run(cases))
    
    expect(results.length).toBe(3)
    results.forEach(r => expect(r.success).toBeTruthy())

  });

});

