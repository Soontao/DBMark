
import {
  createDBConnection
} from './../../index';

describe('sqlite database test', () => {

  test('should aceecpt multi memory connection', async () => {
    const v_int = 13214
    const d1 = await createDBConnection("sqlite:memory");
    const d2 = await createDBConnection("sqlite:memory");
    await d1.exec("create table t1 (c1 integer)")
    await d2.exec(`insert t1 values(${v_int})`)
    const result = await d1.query("select * from t1");
    expect(result.length).toEqual(1)
    expect(result[0]["c1"]).toEqual(v_int)

  })


})