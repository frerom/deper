var retrieveArgumentNames = require("./argumentRetriever");

var compare = function (array1, array2) {
  if(array1.length !== array2.length) return false;
  return array1.reduce(function (value, item) {
    if(!value) return value;
    return array2.indexOf(item) > -1;
  }, true);
};

module.exports = function (func) {
  var argumentNames = retrieveArgumentNames(func);

  return function (depNames) {
    if(!(depNames instanceof Array)) throw "First argument is not an array";
    if(arguments.length - 1 !== depNames.length) throw "Wrong number of dependencies provided";
    if(!compare(depNames, argumentNames)) throw "The provided dependecy names doesn't match the modules dependencies";

    var deps = Array.prototype.slice.call(arguments, 1),
        depsByName = {};

    depNames.forEach(function (depName, index) {
      depsByName[depName] = deps[index];
    });

    finalArgs = [];
    argumentNames.forEach(function (dep) {
      finalArgs.push(depsByName[dep]);
    });

    return func.apply(null, finalArgs);
  };
};
