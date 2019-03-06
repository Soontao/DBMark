const { DatabaseClient } = require("./base")
const sqlite3 = require('sqlite3').verbose();


class SQLiteDatabaseClient extends DatabaseClient {



  async connect(url) {
    return await new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(url, err => {
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

  async isAlive() {
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

  async destroy() {
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

  async query(sql) {
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

  async exec(sql) {
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

module.exports = { SQLiteDatabaseClient }