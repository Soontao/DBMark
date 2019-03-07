import { SQLiteDatabaseClient } from '../sqlite';
import { readFileSync } from 'fs';
import * as path from "path"

describe('sqlite dialect tests', () => {

  const readFile = p => readFileSync(path.join(__dirname, p), { encoding: "utf8" })

  const cURL = ":memory:";

  const sCreateDB = readFile("./sqls/create_db.sql")

  const sInserSample = readFile("./sqls/insert_sample.sql")

  const sSelect = readFile("./sqls/select_data.sql")


  test('sqlite should connect', async () => {
    const c = new SQLiteDatabaseClient()
    expect(await c.connect(cURL)).toBeTruthy()
    await c.destroy()
  });

  test('sqlite should alive', async () => {
    const c = new SQLiteDatabaseClient()
    await c.connect(cURL)
    expect(c.isAlive()).toBeTruthy()
    await c.destroy()
  });

  test('sqlite should destroy', async () => {
    const c = new SQLiteDatabaseClient()
    await c.connect(cURL)
    expect(c.destroy()).toBeTruthy()
  });

  test('sqlite should create table & insert & select', async () => {
    const c = new SQLiteDatabaseClient()
    await c.connect(cURL)
    await c.exec(sCreateDB)
    await c.exec(sInserSample)
    expect((await c.query(sSelect)).length).toBe(1)
    await c.destroy()
  });

});

