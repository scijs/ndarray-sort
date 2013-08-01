var COUNT = 100
var N = 1<<20

var ndarray = require("ndarray")
var ndsort = require("../sort.js")

var x = ndarray(new Int32Array(N))

//Warm up
ndsort(x)

var clock = 0
for(var i=0; i<COUNT; ++i) {

  for(var j=0; j<N; ++j) {
    x.set(j, Math.random()*1000)
  }
  
  var start = Date.now()
  ndsort(x)
  var end = Date.now()
  clock += end - start
}

console.log("ndarray:", clock/COUNT, "ms")
