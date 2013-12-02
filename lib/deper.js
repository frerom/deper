var _ = require("lodash");

_.mixin({
  get: function (coll, key) {
    if(_.isUndefined(coll)) return undefined;
    return coll[key];
  }
});

var basePath = ".";
var defaults = [];

var deper = function (names, func) {
  if(!(names instanceof Array)) throw "Not an array";
  if(typeof func !== "function") throw "Not a function";

  return function (depNames) {
    depNames = depNames || [];
    if(!_.every(depNames, function (name) {
      return names.indexOf(name) !== -1;
    })) throw "The provided dependecy names doesn't match the modules dependencies";

    var deps = Array.prototype.slice.call(arguments, 1),
        depsByName = {};

    depNames.forEach(function (depName, index) {
      depsByName[depName] = deps[index];
    });

    finalArgs = [];
    names.forEach(function (depName) {
      var dep = depsByName[depName];
      if (typeof dep === "undefined") {
        try {
          dep = require(basePath + (_.get(_.find(defaults, function (defaultDep) {
            return defaultDep.name === depName;
          }), "module") || depName));
        } catch (err) {
          if (err.code === "MODULE_NOT_FOUND") {
            dep = require(basePath + depName);
          }
          else {
            console.log(err);
            throw 'Module "' + depName + '" or ' + basePath + depName + '" was not found';
          }
        }
      }
      finalArgs.push(dep);
    });

    return func.apply(null, finalArgs);
  };
};

deper.config = function (config) {
  basePath = config.basePath || basePath;
  defaults = config.defaults || defaults;
};

module.exports = deper;
