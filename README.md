deper
=====

deper is a simple but quite powerful dependecy injector.

The problem it tries to solve is that in node.js, all your internal modules requires all its dependencies. This is troublesome because you can't change your dependencies when you, for example, want to mock something out in a test or switch an implementation without the need to change the naming in every file that uses that dependency.

To solve this, you can create your module with deper. deper will return a function that takes the dependencies in the order that you provide in the first argument.

##Quick Example

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
