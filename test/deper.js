var expect = require("chai").expect;
var deper = require("../lib/deper.js");

describe("deper", function () {
  it("returns a function that sets the given functions arguments", function () {
    var func = function (a, b) {
      return a + b;
    };
    var res = deper(func)(["a", "b"], "hello ", "world");

    expect(res).to.equal("hello world");
  });

  it("throws an exception if the argument isn't a function", function () {
    expect(deper.bind(null, "hello")).to.throw();
  });

  it("throws an exception if the first argument to the returned function isn't an array", function () {
    var func = function () {};
    expect(deper(func).bind(null, "hello")).to.throw();
  });

  it("throws an exception if the number of tail arguments of the returned function isn't the same length as the given array",
  function () {
    var func = function () {
    };
    expect(deper(func).bind(null, ["hello", "world"], "hello", "world", "!")).to.throw();
  });

  it("throws an exception if the given dependecies doesn't match the required dependecies", function () {
    var func = function (hello, world) {
    };
    expect(deper(func).bind(null, ["helo", "word"], "hello", "world")).to.throw();
  });
});
