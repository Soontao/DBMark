import { parseConnectionURL } from "../url_parser";

describe('url parser test suite', () => {

  test('should parse mysql url', () => {
    const c = parseConnectionURL("mysql://127.0.0.1:3306/dbName?useUnicode=true&characterEncoding=utf-8")
    expect(c.host).toEqual("127.0.0.1")
    expect(c.port).toEqual(3306)
    expect(c.parameters.get("useUnicode")).toEqual("true")
    expect(c.type).toEqual("mysql")
  });

});