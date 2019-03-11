

const { v4 } = require("uuid")

export const createUUID = (): string => v4().replace(/-/g, "")