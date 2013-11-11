var retrieveArgumentNames = require("./argumentRetriever");

var compare = function (array1, array2) {
  return array1.reduce(function (value, item) {
    if(!value) return value;
    return array2.indexOf(item) > -1;
  }, true);
};

module.exports = function (names, func) {
  if(!(names instanceof Array)) throw "Not an array";
  if(typeof func !== "function") throw "Not a function";

  return function (depNames) {
    depNames = depNames || [];
    if(!compare(depNames, names)) throw "The provided dependecy names doesn't match the modules dependencies";

    var deps = Array.prototype.slice.call(arguments, 1),
        depsByName = {};

    depNames.forEach(function (depName, index) {
      depsByName[depName] = deps[index];
    });

    finalArgs = [];
    names.forEach(function (depName) {
      var dep = depsByName[depName] || require(depName);
      finalArgs.push(dep);
    });

    return func.apply(null, finalArgs);
  };
};
