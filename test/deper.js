var expect = require("chai").expect;
var deper = require("../lib/deper.js");

describe("deper", function () {
  it("returns a function that sets the given functions arguments", function () {
    var func = function (c, d) {
      return c + d;
    };
    var res = deper(["a", "b"], func)(["a", "b"], "hello ", "world");

    expect(res).to.equal("hello world");
  });

  it("defaults to require if a dependency isn't injected", function () {
    var res;
    var func = function (retrieveArguments) {
      res = retrieveArguments(function (hello, world) {});
    };
    deper(["../lib/argumentRetriever"], func)();
    expect(res).to.deep.equal(["hello", "world"]);
  });

  it("throws an exception if a dependency name array isn't provided", function () {
    expect(deper.bind(null)).to.throw();
  });

  it("throws an exception if the argument isn't a function", function () {
    expect(deper.bind(null, [], "hello")).to.throw();
  });

  it("throws an exception if the given dependecies doesn't match the required dependencies", function () {
    var func = function (hello, world) {
    };
    expect(deper([], func).bind(null, ["helo", "word"], "hello", "world")).to.throw();
  });
});
