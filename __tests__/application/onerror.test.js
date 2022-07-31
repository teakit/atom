"use strict";

const assert = require("assert");
const Atom = require("../..");

describe("app.onerror(err)", () => {
  it("should throw an error if a non-error is given", () => {
    const app = new Atom();

    assert.throws(
      () => {
        app.onerror("foo");
      },
      TypeError,
      "non-error thrown: foo"
    );
  });

  it("should accept errors coming from other scopes", () => {
    const ExternError = require("vm").runInNewContext("Error");

    const app = new Atom();
    const error = Object.assign(new ExternError("boom"), {
      status: 418,
      expose: true,
    });

    assert.doesNotThrow(() => app.onerror(error));
  });

  it("should do nothing if status is 404", () => {
    const app = new Atom();
    const err = new Error();

    err.status = 404;

    const spy = jest.spyOn(console, "error");
    app.onerror(err);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should do nothing if .silent", () => {
    const app = new Atom();
    app.silent = true;
    const err = new Error();

    const spy = jest.spyOn(console, "error");
    app.onerror(err);
    expect(spy).not.toHaveBeenCalled();
    spy.mockRestore();
  });

  it("should log the error to stderr", () => {
    const app = new Atom();
    app.env = "dev";

    const err = new Error();
    err.stack = "Foo";

    const spy = jest.spyOn(console, "error");
    app.onerror(err);
    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
