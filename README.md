deper
=====

A node.js dependency injector

#Usage

  var deper = require("deper");
  module.exports = deper(function (a, b) {
    return a + b;
  });
