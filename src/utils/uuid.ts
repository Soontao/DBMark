

const { v4 } = require("uuid")

export const createUUID = () => v4().replace(/-/g, "")