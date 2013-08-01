var COUNT = 100
var N = 1<<20

var x = new Array(N)
for(var j=0; j<N; ++j) {
  x[j] = 1
}

function compareInt(a,b) {
  return a-b
}

//Warm up
x.sort(compareInt)

var clock = 0
for(var i=0; i<COUNT; ++i) {

  for(var j=0; j<N; ++j) {
    x[j] = (Math.random()*1000)|0
  }
  
  var start = Date.now()
  x.sort(compareInt)
  var end = Date.now()
  clock += end - start
}

console.log("native array:", clock/COUNT, "ms")
