import { createUUID } from '../uuid';
import { range } from "lodash";
import { generateArray } from '../range';

describe('utils tests suite', () => {

  test('should generate uuid', () => {
    const u1 = createUUID()
    const u2 = createUUID()
    expect(u1.length).toBe(32)
    expect(u2.length).toBe(32)
    expect(u1).not.toBe(u2)

  });

  test('should generate array', () => {
    var a_1 = generateArray(1, 100, 10)
    var a_2 = generateArray(1, 100, 13)
    expect(a_1.length).toBe(10)
    expect(a_1).toEqual([1, 12, 23, 34, 45, 56, 67, 78, 89, 100])

    expect(a_2.length).toBe(13)
    expect(a_2).toEqual([1, 9, 17, 25, 34, 42, 50, 58, 67, 75, 83, 91, 100])

  });
});