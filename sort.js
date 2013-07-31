"use strict"

var compile = require("./lib/compile_sort.js")
var CACHE = {}

function sort(array, axis) {
  var order = array.order
  var dtype = array.dtype
  axis = (axis || 0)|0
  var typeSig = [order, axis, dtype ]
  var typeName = typeSig.join(":")
  var compiled = CACHE[typeName]
  if(!compiled) {
    CACHE[typeName] = compiled = compile(order, axis, dtype)
  }
  compiled(array)
}

module.exports = sort