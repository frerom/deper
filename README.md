deper
=====

deper is a simple but quite powerful dependecy injector.

The problem it tries to solve is that in node.js, all your internal modules requires all its dependencies. This is troublesome because you can't change your dependencies when you, for example, want to mock something out in a test or switch an implementation without the need to change the naming in every file that uses that dependency.

To solve this, you can create your module with deper.

##Quick Example

###randomizer.js
```
var deper = require("deper");
module.exports = deper(["_"], function (_) {
  return {
    random: function () {
      _.random(1, 10);
    }
  };
});
```

###main.js
```
var _ = require("lodash");
var randomizer = require("./randomizer")(["_"], _);
var randomNumber = randomizer.random();
```
##Defaults to require
If a dependency isn't provided by the user, it will default to require.

###randomizer.js
```
var deper = require("deper");
module.exports = deper(["lodash"], function (_) {
  return {
    random: function () {
      _.random(1, 10);
    }
  };
});
```

###main.js
Note the empty call to the required module.
```
var randomizer = require("randomizer")();
randomNumber = randomizer.random();
```

##Setting Base Path
If you want to default to your own project modules you will need to provide a base path for deper.

This is typically done in your main script.

###main.js
```
var deper = require("deper");
deper.config({
  basePath: __dirname + "/"
});
```
###randomizer
```
var deper = require("deper");
module.exports = deper(["src/myOwnUtilityBelt"], function (_) {
  return {
    random: function () {
      _.random(1, 10);
    }
  };
});
```

##Setting default dependencies
###main.js
```
var deper = require("deper");
deper.config({
  basePath: __dirname + "/",
  defaults: [
    {
      name: "_",
      module: "src/myOwnUtilityBelt"
    }
  ]
});

var randomizer = require("randomizer")();
```
###randomizer
```
var deper = require("deper");
module.exports = deper(["_"], function (_) {
  return {
    random: function () {
      _.random(1, 10);
    }
  };
});
```
