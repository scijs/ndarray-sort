ndarray-sort
============
Sorts [ndarrays](https://github.com/mikolalysenko/ndarray) in place using a dual pivot quick sort.

## Example

```javascript
var ndarray = require("ndarray")
var ndsort = require("ndarray-sort")

```

## Install

    npm install ndarray-sort

## API

### `require("ndarray-sort")(array)`
Sorts the given array along the first axis in lexicographic order.  The sorting is done in place.

* `array` is an ndarray

## Credits
JavaScript implementation (c) 2013 Mikola Lysenko.  MIT License

Based on Dart's dual pivot quick sort implementation by Ola Martin Bini and Michael Haubenwallner.  For more information see lib/dart/AUTHORS and lib/dart/LICENSE .
