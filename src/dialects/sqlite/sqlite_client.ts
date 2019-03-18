import { AbstractDatabaseClient } from "../AbstractDatabaseClient";
import { parseConnectionURL } from "../../utils";

const sqlite3 = require("sqlite3").verbose()

export class SQLiteDatabaseClient extends AbstractDatabaseClient {

  private db

  async connect(url): Promise<boolean> {
    const options = parseConnectionURL(url)
    var parseUrl = ""
    
    switch (options.path) {
      case "memory":
        parseUrl = `:${options.path}:`;
        break;
      default:
        parseUrl = options.path
        break;
    }

    return await new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(parseUrl, err => {
        if (err) {
          reject(err)
        } else {
          this.db.run("SELECT 1 + 1;", (result, err) => {
            if (err) {
              reject(err)
            } else {
              resolve(true)
            }
          })
        }
      })
    })
  }

  async isAlive(): Promise<boolean> {
    return new Promise((res, rej) => {
      this.db.exec("SELECT 1 + 1;", (err) => {
        if (err) {
          rej(err)
        } else {
          res(true)
        }
      })
    })
  }

  async destroy(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.close(err => {
        if (err) {
          reject(err)
        } else {
          resolve(true)
        }
      })
    })
  }

  async query(sql): Promise<Array<Object>> {
    return new Promise((resolve, reject) => {
      this.db.all(sql, (err, rows) => {
        if (err) {
          reject(err)
        } else {
          resolve(rows)
        }
      })
    })
  }

  async exec(sql): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

}

