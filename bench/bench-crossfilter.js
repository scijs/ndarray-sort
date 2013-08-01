var COUNT = 100
var N = 1<<20

var ndarray = require("ndarray")
var crossfilter = require("crossfilter")

var x = new Int32Array(N)

//Warm up
crossfilter.quicksort(x, 0, N)

var clock = 0
for(var i=0; i<COUNT; ++i) {

  for(var j=0; j<N; ++j) {
    x[j] = Math.random()*1000
  }
  
  var start = Date.now()
  crossfilter.quicksort(x, 0, N)
  var end = Date.now()
  clock += end - start
}

console.log("crossfilter:", clock/COUNT, "ms")
