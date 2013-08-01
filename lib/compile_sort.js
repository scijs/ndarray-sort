"use strict"

var pool = require("typedarray-pool")

var INSERTION_SORT_THRESHOLD = 32

function getMallocFree(dtype) {
  switch(dtype) {
    case "uint8":
      return [pool.mallocUint8, pool.freeUint8]
    case "uint16":
      return [pool.mallocUint16, pool.freeUint16]
    case "uint32":
      return [pool.mallocUint32, pool.freeUint32]
    case "int8":
      return [pool.mallocInt8, pool.freeInt8]
    case "int16":
      return [pool.mallocInt16, pool.freeInt16]
    case "int32":
      return [pool.mallocInt32, pool.freeInt32]
    case "float32":
      return [pool.mallocFloat, pool.freeFloat]
    case "float64":
      return [pool.mallocDouble, pool.freeDouble]
    default:
      return null
  }
}

function shapeArgs(dimension) {
  var args = []
  for(var i=0; i<dimension; ++i) {
    args.push("s"+i)
  }
  for(var i=0; i<dimension; ++i) {
    args.push("n"+i)
  }
  for(var i=1; i<dimension; ++i) {
    args.push("d"+i)
  }
  for(var i=1; i<dimension; ++i) {
    args.push("e"+i)
  }
  for(var i=1; i<dimension; ++i) {
    args.push("f"+i)
  }
  return args
}

function createInsertionSort(order, dtype) {

  var code = ["'use strict'"]
  var funcName = ["ndarrayInsertionSort", order.join("d"), dtype].join("")
  var funcArgs = ["left", "right", "data", "offset" ].concat(shapeArgs(order.length))
  var allocator = getMallocFree(dtype)
  
  var vars = [ "i,j,cptr,ptr=left*s0+offset" ]
  
  if(order.length > 1) {
    var scratch_shape = []
    for(var i=1; i<order.length; ++i) {
      vars.push("i"+i)
      scratch_shape.push("n"+i)
    }
    if(allocator) {
      vars.push("scratch=malloc(" + scratch_shape.join("*") + ")")
    } else {
      vars.push("scratch=new Array("+scratch_shape.join("*") + ")")
    }
    vars.push("dptr","sptr","a","b")
  } else {
    vars.push("scratch")
  }
  
  //Create function header
  code.push(
    ["function ", funcName, "(", funcArgs.join(","), "){var ", vars.join(",")].join(""),
      "for(i=left+1;i<=right;++i){",
        "j=i;ptr+=s0",
        "cptr=ptr")
  
  if(order.length > 1) {
  
    //Copy data into scratch
    code.push("dptr=0;sptr=ptr")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    code.push("scratch[dptr++]=data[sptr]")
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push("sptr+=d"+j,"}")
    }
    
    //Compare items in outer loop
    code.push("__g:while(j-->left){",
              "dptr=0",
              "sptr=cptr-s0")
    for(var i=1; i<order.length; ++i) {
      if(i === 1) {
        code.push("__l:")
      }
      code.push(["for(i",i,"=0;i",i,"<n",i,";++i",i,"){"].join(""))
    }
    code.push("a=data[sptr]\nb=scratch[dptr]\nif(a<b){break __g}\nif(a>b){break __l}")
    for(var i=order.length-1; i>=1; --i) {
      code.push(
        "sptr+=e"+i,
        "dptr+=f"+i,
        "}")
    }
    
    //Copy data back
    code.push("dptr=cptr;sptr=cptr-s0")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    code.push("data[dptr]=data[sptr]")
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["dptr+=d",j,";sptr+=d",j].join(""),"}")
    }
    
    //Close while loop
    code.push("cptr-=s0\n}")

    //Copy scratch into cptr
    code.push("dptr=cptr;sptr=0")
    for(var i=order.length-1; i>=0; --i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push(["for(i",j,"=0;i",j,"<n",j,";++i",j,"){"].join(""))
    }
    code.push("data[dptr]=scratch[sptr++]")
    for(var i=0; i<order.length; ++i) {
      var j = order[i]
      if(j === 0) {
        continue
      }
      code.push("dptr+=d"+j,"}")
    }
  } else {
    code.push("scratch=data[ptr]",
              "while((j-->left)&&(data[cptr-s0]>scratch)){",
                "data[cptr]=data[cptr-s0]",
                "cptr-=s0",
              "}",
              "data[cptr]=scratch")
  }
  
  //Close outer loop body
  code.push("}")
  if(order.length > 1 && allocator) {
    code.push("free(scratch)")
  }
  code.push("} return " + funcName)
  
  //console.log(code.join("\n"))
  
  //Compile and link function
  if(allocator) {
    var result = new Function("malloc", "free", code.join("\n"))
    return result(allocator[0], allocator[1])
  } else {
    var result = new Function(code.join("\n"))
    return result()
  }
}


function createQuickSort(order, dtype) {
}

function compileSort(order, dtype) {

  if(dtype === "generic") {
    throw new Error("ndarray-sort: Generic ndarrays not yet supported")
  }
  
  var code = ["'use strict'"]
  var funcName = ["ndarraySortWrapper", order.join("d"), dtype].join("")
  var funcArgs = [ "array" ]
  
  code.push(["function ", funcName, "(", funcArgs.join(","), "){"].join(""))
  
  //Unpack local variables from array
  var vars = ["data=array.data,offset=array.offset|0,shape=array.shape,stride=array.stride"]
  for(var i=0; i<order.length; ++i) {
    vars.push(["s",i,"=stride[",i,"]|0,n",i,"=shape[",i,"]|0"].join(""))
  }
  
  var scratch_stride = new Array(order.length)
  var nprod = []
  for(var i=0; i<order.length; ++i) {
    var k = order[i]
    if(k === 0) {
      continue
    }
    if(nprod.length === 0) {
      scratch_stride[k] = "1"
    } else {
      scratch_stride[k] = nprod.join("*")
    }
    nprod.push("n"+k)
  }
  
  //console.log(scratch_stride, order)
  
  var p = -1, q = -1
  for(var i=0; i<order.length; ++i) {
    var j = order[i]
    if(j !== 0) {
      if(p > 0) {
        vars.push(["d",j,"=s",j,"-d",p,"*n",p].join(""))
      } else {
        vars.push(["d",j,"=s",j].join(""))
      }
      p = j
    }
    var k = order.length-1-i
    if(k !== 0) {
      if(q > 0) {
        vars.push(["e",k,"=s",k,"-e",q,"*n",q,
                  ",f",k,"=",scratch_stride[k],"-f",q,"*n",q].join(""))
      } else {
        vars.push(["e",k,"=s",k,",f",k,"=",scratch_stride[k]].join(""))
      }
      q = k
    }
  }
  
  //Declare local variables
  code.push("var " + vars.join(","))
  
  //code.push("console.log(array.stride.slice(),'n=',n0,n1,n2,'f=',f1,f2,'e=',e1,e2)")
  
  //Create arguments for subroutine
  var sortArgs = ["0", "n0-1", "data", "offset"].concat(shapeArgs(order.length))
  
  //Call main sorting routine
  code.push("doSort(" + sortArgs.join(",") + ")")
  
  //Return
  code.push("}return " + funcName)
  
  //console.log(code.join("\n"))

  //Link everything together
  var result = new Function("doSort", code.join("\n"))
  return result(createInsertionSort(order, dtype))
}

module.exports = compileSort