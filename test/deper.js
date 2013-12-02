var expect = require("chai").expect;

describe("deper", function () {
  it("returns a function that sets the given functions arguments", function () {
    var deper = require("../lib/deper.js");
    var func = function (c, d) {
      return c + d;
    };
    var res = deper(["a", "b"], func)(["a", "b"], "hello ", "world");

    expect(res).to.equal("hello world");
  });

  it("defaults to require if a dependency isn't injected, relative to the given base path", function () {
    var deper = require("../lib/deper.js");
    deper.config({
      basePath: __dirname + "/"
    });

    var res;
    var func = function (testData) {
      res = testData;
    };
    deper(["testModule.js"], func)();
    expect(res).to.equal("hello world");
  });

  it("throws an exception if a dependency name array isn't provided", function () {
    var deper = require("../lib/deper.js");
    expect(deper.bind(null)).to.throw();
  });

  it("throws an exception if the argument isn't a function", function () {
    var deper = require("../lib/deper.js");
    expect(deper.bind(null, [], "hello")).to.throw();
  });

  it("throws an exception if the given dependecies doesn't match the required dependencies", function () {
    var deper = require("../lib/deper.js");
    var func = function (hello, world) {};
    expect(deper([], func).bind(null, ["helo", "word"], "hello", "world")).to.throw();
  });

  it("can set default dependencies in the config", function () {
    var deper = require("../lib/deper.js");

    deper.config({
      basePath: __dirname + "/",
      defaults: [
        {
          name: "_",
          module: "testModule.js"
        }
      ]
    });

    var res;

    var func = function (_) {
      res = _;
    };

    deper(["_"], func)();

    expect(res).to.equal("hello world");
  });
});
