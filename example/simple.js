var ndarray = require("ndarray")
var ndsort = require("../sort.js")
var unpack = require("ndarray-unpack")

//Create an array
var x = ndarray(new Float32Array(60), [20, 3])

for(var i=0; i<20; ++i) {
  for(var j=0; j<3; ++j) {
    x.set(i,j, Math.random())
  }
}

//Print out x:
console.log("Unsorted:", unpack(x))

//Sort x
ndsort(x)

//Print out sorted x:
console.log("Sorted:", unpack(x))
