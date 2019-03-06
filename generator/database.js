
const createDatabase = (conn, tables = [{ columns: 100, rows: 100000 }, { columns: 50, rows: 100000 }]) => {

}

const loadDatabaseConfig = (conn, config) => {

}

class GeneratedDatabase {

  constructor(conn) {
    this.conn = conn
  }

  getTables() {
    return this.tables
  }

}

module.exports = { createDatabase, loadDatabaseConfig, GeneratedDatabase }