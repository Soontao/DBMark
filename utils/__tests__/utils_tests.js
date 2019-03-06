const { createUUID } = require("..")

describe('utils tests suite', () => {

  test('should generate uuid', () => {
    const u1 = createUUID()
    const u2 = createUUID()
    expect(u1.length).toBe(32)
    expect(u2.length).toBe(32)
    expect(u1).not.toBe(u2)

  });

});