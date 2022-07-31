"use strict";

const assert = require("assert");
const util = require("util");
const Atom = require("../..");
const app = new Atom();

describe("app.inspect()", () => {
  it("should work", () => {
    const str = util.inspect(app);
    assert.strictEqual("{ subdomainOffset: 2, proxy: false, env: 'test' }", str);
  });

  it("should return a json representation", () => {
    assert.deepStrictEqual({ subdomainOffset: 2, proxy: false, env: "test" }, app.inspect());
  });
});
