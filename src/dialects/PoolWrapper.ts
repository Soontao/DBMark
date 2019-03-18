import { IDatabaseClient } from "./IDatabaseClinet";

export class PoolWrapper {

  private _pool: any;

  constructor(pool) {
    this._pool = pool
  }

  async get(): Promise<IDatabaseClient> {
    return new Promise((resolve, reject) => {
      this._pool.acquire((err, client) => {
        if (err) {
          reject(err)
        } else {
          resolve(client)
        }
      })
    })

  }

  release(client: IDatabaseClient) {
    this._pool.release(client)
  }

  async destroy() {
    return new Promise(resolve => {
      this._pool.drain(() => {
        this._pool.destroyAllNow(() => {
          resolve();
        });
      });
    })
  }

}