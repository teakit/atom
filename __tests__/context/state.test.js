"use strict";

const request = require("supertest");
const assert = require("assert");
const Atom = require("../..");

describe("ctx.state", () => {
  it("should provide a ctx.state namespace", () => {
    const app = new Atom();

    app.use(ctx => {
      assert.deepStrictEqual(ctx.state, {});
    });

    const server = app.listen();

    return request(server).get("/").expect(404);
  });
});
