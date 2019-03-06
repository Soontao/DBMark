

const { v4 } = require("uuid")

const createUUID = () => v4().replace(/-/g, "")

module.exports = { createUUID }