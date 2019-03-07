
export const createTable = (columnCount = 15, conn) => {

}

export class GeneratedTable {


  private columns: GeneratedColumn[];

  /**
   * @returns {Array<GeneratedColumn>}
   */
  getColumns():Array<GeneratedColumn> {
    return this.columns
  }

}

export class GeneratedColumn {

  getOwnerTable() {

  }

  getRef() {

  }

  getType() {

  }

}

export class GeneratedColumnRef {

  getRefColumn() {

  }

}
