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
  var code = [ "'use strict'" ]
  var funcName = ["ndarrayQuickSort", order.join("d"), dtype].join("")
  var funcArgs = ["left", "right", "data", "offset" ].concat(shapeArgs(order.length))
  
  var vars = [
    "sixth=((right-left+1)/6)|0",
    "index1=left+sixth",
    "index2=right-sixth",
    "index3=(left+right)>>1",
    "index2=index3-sixth",
    "index4=index3+sixth",
    "el1=index1",
    "el2=index2",
    "el3=index3",
    "el4=index4",
    "el5=index5",
    "less=left+1",
    "great=right-1",
    "pivots_are_equal=true",
    "k",
    "comp"
  ]
  
  if(order.length > 1) {
    var ele_size = []
    for(var i=1; i<order.length; ++i) {
      ele_size.push("n"+i)
      vars.push("i"+i)
    }
    vars.push("elementSize="+ele_size.join("*"),
              "pivot1=malloc(elementSize)",
              "pivot2=malloc(elementSize)")
  } else {
    vars.push("pivot1", "pivot2")
  }
  
  //Initialize local variables
  code.push("var " + vars.join(","))
  
  function toPointer(v) {
    return "(offset+v*s0)"
  }
  
  function cleanUp() {
    if(order.length > 1) {
      code.push("free(pivot1)", "free(pivot2)")
    }
  }
  
  function compareSwap(a, b) {
    //TODO:
    //  if (compare(el1, el2) > 0) { var t = el1; el1 = el2; el2 = t; }
  }
  
  compareSwap(1, 2)
  compareSwap(4, 5)
  compareSwap(1, 3)
  compareSwap(2, 3)
  compareSwap(1, 4)
  compareSwap(3, 4)
  compareSwap(2, 5)
  compareSwap(2, 3)
  compareSwap(4, 5)
  
  
  
  
  //TODO:
  //  pivot1 = a[el2]
  //  pivot2 = a[el4]
  //  pivots_are_equal = pivot1 == pivot2
  //  x = a[el1]
  //  y = a[el3]
  //  z = a[el5]
  //  a[index1] = x
  //  a[index3] = y
  //  a[index5] = z
  //


  function moveElement(dst, src) {
    if(order.length > 1) {
      code.push(["data[offset+s0*",dst,"]=data[offset+s0*",src,"]"].join(""))
    } else {
    
    }
  
    //TODO:
    //  a[dst] = a[src]
  }
  
  moveElement("index2", "left")
  moveElement("index4", "right")

  
  function comparePivot(result, ptr, n) {
    //TODO:
    //  result=compare(a[ptr], pivot[n])
  }
  
  function swapElements(a, b) {
    //TODO:
    // a[k] = a[less];
    // a[less] = ak;
  }
  
  function tripleSwap(k, less, great) {
    //TODO:
    // a[k] = a[less];
    // a[less++] = a[great];
    // a[great--] = ak;
  }
  
  function swapAndDecrement(k, great) {
    swapElements(k, great)
    code.push("--"+great)
  }
    
  code.push("if(pivots_are_equal){")
    //Pivots are equal case
    code.push("for(k=less;k<=great;++k){")
      comparePivot("comp", "k", 1)
      code.push("if(comp===0){continue}")
      code.push("if(comp<0){")
        code.push("if(k!==less){")
          swapElements("k", "less")
        code.push("}")
        code.push("++less")
      code.push("}else{")
        code.push("while(true){")
          comparePivot("comp", "great", 1)
          code.push("if(comp>0){")
            code.push("great--")
          code.push("}else if(comp<0){")
            tripleSwap("k", "less", "great")
            code.push("break")
          code.push("}else{")
            swapAndDecrement("k", "great")
            code.push("break")
          code.push("}")
        code.push("}")
      code.push("}")
    code.push("}")
  code.push("}else{")
    //Pivots not equal case
    code.push("for(k=less;k<=great;++k){")
      comparePivot("comp_pivot1", "k", 1)
      code.push("if(comp_pivot1<0){")
        code.push("if(k!==less){")
          swapElements("k", "less")
        code.push("}")
        code.push("++less")
      code.push("}else{")
        comparePivot("comp_pivot2", "k", 2)
        code.push("if(comp_pivot2>0){")
          code.push("while(true){")
            comparePivot("comp", "great", 2)
            code.push("if(comp>0){")
              code.push("if(--great<k){break}")
              code.push("continue")
            code.push("}else{")
              comparePivot("comp", "great", 1)
              code.push("if(comp<0){")
                tripleSwap("k", "less", "great")
              code.push("}else{")
                swapAndDecrement("k", "great")
              code.push("}")
              code.push("break")
            code.push("}")
          code.push("}")
        code.push("}")
      code.push("}")
    code.push("}")
  code.push("}")
  
  //Move pivots to correct place
  function storePivot(ptr, n) {
  }
  
  moveElement("left", "(less-1)")
  storePivot("(less-1)", 1)
  moveElement("right", "(great+1)")
  storePivot("(right+1)", 2)

  //Recursive sort call
  function doSort(left, right) {
  }
  doSort("left", "(less-2)")
  doSort("(great+2)", "right")
  
  //If pivots are equal, then early out
  code.push("if(pivots_are_equal){")
    cleanUp()
    code.push("return")
  code.push("}")
  
  //Check bounds
  code.push("if(less<index1&&great>index5){")
    /*
    while (compare(a[less], pivot1) == 0) { less++; }
    while (compare(a[great], pivot2) == 0) { great--; }

    // Copy paste of the previous 3-way partitioning with adaptions.
    //
    // We partition the list into three parts:
    //  1. == pivot1
    //  2. > pivot1 && < pivot2
    //  3. == pivot2
    //
    // During the loop we have:
    // [ == pivot1 | > pivot1 && < pivot2 | unpartitioned  | == pivot2 ]
    //              ^                      ^              ^
    //            less                     k              great
    //
    // Invariants:
    //   1. for x in [ *, less[ : x == pivot1
    //   2. for x in [less, k[ : pivot1 < x && x < pivot2
    //   3. for x in ]great, * ] : x == pivot2
    for (int k = less; k <= great; k++) {
      var ak = a[k];
      int comp_pivot1 = compare(ak, pivot1);
      if (comp_pivot1 == 0) {
        if (k != less) {
          a[k] = a[less];
          a[less] = ak;
        }
        less++;
      } else {
        int comp_pivot2 = compare(ak, pivot2);
        if (comp_pivot2 == 0) {
          while (true) {
            int comp = compare(a[great], pivot2);
            if (comp == 0) {
              great--;
              if (great < k) break;
              // This is the only location inside the loop where a new
              // iteration is started.
              continue;
            } else {
              // a[great] < pivot2.
              comp = compare(a[great], pivot1);
              if (comp < 0) {
                // Triple exchange.
                a[k] = a[less];
                a[less++] = a[great];
                a[great--] = ak;
              } else {
                // a[great] == pivot1.
                a[k] = a[great];
                a[great--] = ak;
              }
              break;
            }
          }
        }
      }
    }*/
  
  
  code.push("}")
  cleanUp()
  doSort("less", "great")
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
  
  //Create arguments for subroutine
  var sortArgs = ["0", "n0-1", "data", "offset"].concat(shapeArgs(order.length))
  
  //Call main sorting routine
  code.push("doSort(" + sortArgs.join(",") + ")")
  
  //Return
  code.push("}return " + funcName)
  
  //Link everything together
  var result = new Function("doSort", code.join("\n"))
  return result(createInsertionSort(order, dtype))
}

module.exports = compileSort