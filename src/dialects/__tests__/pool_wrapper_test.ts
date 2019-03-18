import { createDBPool, IDatabaseClinet } from "..";

describe('pool wrapper test suite', () => {

  jest.setTimeout(10 * 60 * 1000)
  
  test('should create pool & get clients', async () => {
    const pool_size = 15
    const pool = createDBPool("sqlite:memory", 5, pool_size)
    const clients: IDatabaseClinet[] = []

    for (let index = 0; index < pool_size; index++) {
      clients.push(await pool.get())
    }

    await Promise.all(clients.map(async c => {
      expect(await c.isAlive()).toBeTruthy()
      pool.release(c)
    }))

    await pool.destroy()

  })

})
