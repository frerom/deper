deper
=====

deper is a simple but quite powerful dependecy injector.

The problem it tries to solve is that in node.js all your internal modules requires all
its dependecies. This is troublesome because you can't change your dependencies when you, for
example, want to mock something out in a test or switch an implemention without the need
to change the naming in every file that uses that dependency.

##Usage

###randomizer.js
```
var deper = require("deper");
module.exports = deper(function (handsomeUtil) {
  return {
    random: function () {
      handsomeUtil.random(1, 10);
    }
  };
});
```

###main.js
```
var _ = require("lodash");
var randomizer = require("./randomizer")(["handsomeUtil"], _);
var randomNumber = randomizer.random();
```
