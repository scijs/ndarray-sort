"use strict"

var ndsort = require("../sort.js")
var ndarray = require("ndarray")
var pack = require("ndarray-pack")
var unpack = require("ndarray-unpack")
var ops = require("ndarray-ops")

/*
require("tape")("ndarray-sort-1d", function(t) {
  function runTest(n) {
    var arr = new Array(n)
    for(var i=0; i<n; ++i) {
      arr[i] = Math.floor(Math.random() * 1000)
    }
    
    var nd0 = ndarray(new Uint16Array(arr))
    var nd1 = ndarray(new Float32Array(10*arr.length)).step(10)
    var nd2 = ndarray(new Int32Array(arr)).step(-1)
    var nd3 = ndarray(new Array(arr.length))
    ops.assign(nd1, nd0)
    ops.assign(nd3, nd0)
    
    ndsort(nd0)
    ndsort(nd1)
    ndsort(nd2)
    ndsort(nd3)
    arr.sort(function (a,b) { return a-b })
    
    for(var i=0; i<n; ++i) {
      t.equals(nd0.get(i), arr[i], "flat")
      t.equals(nd1.get(i), arr[i], "skip")
      t.equals(nd2.get(i), arr[i], "reverse")
      t.equals(nd3.get(i), arr[i], "array")
    }
  }
  
  runTest(1)
  runTest(2)
  runTest(16)
  runTest(32)
  runTest(100)

  t.end()
})
*/

require("tape")("ndarray-sort-2d", function(t) {
  function compare1D(a, b) {
    for(var i=0; i<a.length; ++i) {
      var d = a[i] - b[i]
      if(d) { return d }
    }
    return 0
  }
  
  function create2DArray(nr, nc) {
    var result = new Array(nr)
    for(var i=0; i<nr; ++i) {
      result[i] = new Array(nc)
      for(var j=0; j<nc; ++j) {
        result[i][j] = Math.floor(Math.random() * 10)
      }
    }
    return result
  }
  
  function runTest2D(nr, nc) {
    var arr = create2DArray(nr, nc)
    var nd0 = pack(arr)
    var nd1 = ndarray(new Uint32Array(nr*nc), [nr, nc], [1, nr])
    ops.assign(nd1, nd0)
    
    var nd2 = ndarray(new Int16Array(10*nr*nc), [5*nr,2*nc]).step(5, 2)
    ops.assign(nd2, nd0)
    
    var nd3 = pack(arr).step(-1, 1)
    var nd4 = pack(arr).step(1, -1)
    ops.assign(nd4, nd0)
    
    var nd6 = ndarray(new Array(nr*nc), [nr,nc])
    ops.assign(nd6, nd0)
    
    ndsort(nd0)
    ndsort(nd1)
    ndsort(nd2)
    ndsort(nd3)
    ndsort(nd4)
    ndsort(nd6)
    arr.sort(compare1D)
    
    for(var i=0; i<nr; ++i) {
      for(var j=0; j<nc; ++j) {
        t.equals(nd0.get(i,j), arr[i][j], "flat")
        t.equals(nd1.get(i,j), arr[i][j], "transpose")
        t.equals(nd2.get(i,j), arr[i][j], "stride")
        t.equals(nd3.get(i,j), arr[i][j], "flipx")
        t.equals(nd4.get(i,j), arr[i][j], "flipy")
        t.equals(nd6.get(i,j), arr[i][j], "array")
      }
    }
  }

  runTest2D(3, 2)
  runTest2D(3,1)
  runTest2D(32, 3)
  runTest2D(10, 10)
  runTest2D(100,3)
  runTest2D(32,1)
  runTest2D(3,10)
  runTest2D(1,32)
  
  t.end()
})

require("tape")("ndarray-sort-3d", function(t) {
  function compare2D(a, b) {
    for(var i=0; i<a.length; ++i) {
      for(var j=0; j<a[i].length; ++j) {
        var d = a[i][j] - b[i][j]
        if(d) { return d }
      }
    }
    return 0
  }
  
  function create3DArray(nr, nc, np) {
    var result = new Array(nr)
    for(var i=0; i<nr; ++i) {
      result[i] = new Array(nc)
      for(var j=0; j<nc; ++j) {
        result[i][j] = new Array(np)
        for(var k=0; k<np; ++k) {
          result[i][j][k] = Math.floor(Math.random()*3)
        }
      }
    }
    return result
  }
  
  function runTest3D(nr, nc, np) {
    var arr = create3DArray(nr, nc, np)
    var nd0 = pack(arr)
    
    var nd1 = ndarray(new Uint32Array(nr * nc * np), [nc, np, nr]).transpose(2, 0, 1)
    ops.assign(nd1, nd0)

    var nd2 = ndarray(new Uint32Array(nr * nc * np), [np, nc, nr]).transpose(2, 1, 0)
    ops.assign(nd2, nd0)
    
    var nd3 = ndarray(new Uint32Array(nr * nc * np), [np, nr, nc]).transpose(1, 2, 0)
    ops.assign(nd3, nd0)
    
    var nd4 = ndarray(new Uint32Array(nr*nc*np), [nr, nc, np])
    ops.assign(nd4, nd0)
    
    ndsort(nd0)
    ndsort(nd1)
    ndsort(nd2)
    ndsort(nd3)
    ndsort(nd4)
    arr.sort(compare2D)
    
    for(var i=0; i<nr; ++i) {
      for(var j=0; j<nc; ++j) {
        for(var k=0; k<np; ++k) {
          t.equals(nd0.get(i,j,k), arr[i][j][k], "flat")
          t.equals(nd1.get(i,j,k), arr[i][j][k], "transposed1")
          t.equals(nd2.get(i,j,k), arr[i][j][k], "transposed2")
          t.equals(nd3.get(i,j,k), arr[i][j][k], "transposed3")
          t.equals(nd4.get(i,j,k), arr[i][j][k], "transposed4")

        }
      }
    }
  }

  runTest3D(3, 3, 3)
  runTest3D(1, 10, 10)
  runTest3D(100, 2, 2)
  runTest3D(100, 1, 2)
  runTest3D(100, 2, 1)
  runTest3D(10, 5, 8)
  
  
  t.end()
})

