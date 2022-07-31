"use strict";

const request = require("supertest");
const assert = require("assert");
const Atom = require("../..");

describe("app.compose", () => {
  it("should work with default compose ", async () => {
    const app = new Atom();
    const calls = [];

    app.use((ctx, next) => {
      calls.push(1);
      return next().then(() => {
        calls.push(4);
      });
    });

    app.use((ctx, next) => {
      calls.push(2);
      return next().then(() => {
        calls.push(3);
      });
    });

    const server = app.listen();

    await request(server).get("/").expect(404);

    assert.deepStrictEqual(calls, [1, 2, 3, 4]);
  });

  it("should work with configurable compose", async () => {
    const calls = [];
    let count = 0;
    const app = new Atom({
      compose(fns) {
        return async ctx => {
          const dispatch = async () => {
            count++;
            const fn = fns.shift();
            fn && fn(ctx, dispatch);
          };
          dispatch();
        };
      },
    });

    app.use((ctx, next) => {
      calls.push(1);
      next();
      calls.push(4);
    });
    app.use((ctx, next) => {
      calls.push(2);
      next();
      calls.push(3);
    });

    const server = app.listen();

    await request(server).get("/");

    assert.deepStrictEqual(calls, [1, 2, 3, 4]);
    assert.equal(count, 3);
  });
});
