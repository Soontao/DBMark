import { SQLiteDatabaseSQLHelper } from '../sqlite';
import { ColumnType } from '../../generator/config';
import { createDBConnection } from '..';
import { createUUID } from '../../utils';

describe('sqlite dialect tests', () => {

  const randomUUID = createUUID();

  const cURL = "sqlite:memory";

  const sCreateTable = `CREATE TABLE IF NOT EXISTS test ( id VARCHAR(32) PRIMARY KEY, v_text VARCHAR(255) );`

  const sInserSample = `INSERT INTO test(id,v_text) VALUES ("${randomUUID}","test text");`

  const sSelect = `SELECT * FROM test WHERE id = "${randomUUID}";`


  test('sqlite should connect', async () => {
    const c = await createDBConnection(cURL)
    expect(c.isAlive()).toBeTruthy()
    await c.destroy()
  });

  test('sqlite should alive', async () => {
    const c = await createDBConnection(cURL)
    expect(c.isAlive()).toBeTruthy()
    await c.destroy()
  });

  test('sqlite should destroy', async () => {
    const c = await createDBConnection(cURL)
    expect(c.destroy()).toBeTruthy()
  });

  test('sqlite should create table & insert & select', async () => {
    const c = await createDBConnection(cURL)
    await c.exec(sCreateTable)
    await c.exec(sInserSample)
    expect((await c.query(sSelect)).length).toBe(1)
    await c.destroy()
  });

  test('should generate sqlite create table sql', () => {
    const helper = new SQLiteDatabaseSQLHelper();
    const ddl = helper.generateCreateTableSQL({
      tableName: "t1",
      columns: [
        { columnName: "pk_id", columnType: ColumnType.VARCHAR_32, },
        { columnName: "t1_c1", columnType: ColumnType.INTEGER, },
        { columnName: "t1_c2", columnType: ColumnType.TINYINT, },
      ],
      rowsCount: 100
    })

    expect(ddl.trim()).toEqual("CREATE TABLE IF NOT EXISTS t1 ( pk_id VARCHAR(32),t1_c1 INTEGER,t1_c2 TINYINT );")


  });

});

