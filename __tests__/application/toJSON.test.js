"use strict";

const assert = require("assert");
const Atom = require("../..");

describe("app.toJSON()", () => {
  it("should work", () => {
    const app = new Atom();
    const obj = app.toJSON();

    assert.deepStrictEqual(
      {
        subdomainOffset: 2,
        proxy: false,
        env: "test",
      },
      obj
    );
  });
});
