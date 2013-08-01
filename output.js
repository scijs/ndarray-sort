'use strict'
function ndarrayQuickSort1d0float64(left,right,data,offset,s0,s1,n0,n1,d1,e1,f1){
var sixth=((right-left+1)/6)|0,index1=left+sixth,index5=right-sixth,index3=(left+right)>>1,index2=index3-sixth,index4=index3+sixth,el1=index1,el2=index2,el3=index3,el4=index4,el5=index5,less=left+1,great=right-1,pivots_are_equal=true,tmp,tmp0,x,y,z,k,ptr0,ptr1,ptr2,comp_pivot1,comp_pivot2,comp,i1,b_ptr0,b_ptr1,b_ptr2,b_ptr3,b_ptr4,b_ptr5,b_ptr6,b_ptr7,ptr3,ptr4,ptr5,ptr6,ptr7,pivot_ptr,ptr_shift,elementSize=n1,pivot1=malloc(elementSize),pivot2=malloc(elementSize)
b_ptr0=s0*el1
b_ptr1=s0*el2
ptr_shift=offset
__l1:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el1;el1=el2;el2=tmp0;break __l1}
if(comp<0){break __l1}
ptr_shift+=e1
}
b_ptr0=s0*el4
b_ptr1=s0*el5
ptr_shift=offset
__l2:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el4;el4=el5;el5=tmp0;break __l2}
if(comp<0){break __l2}
ptr_shift+=e1
}
b_ptr0=s0*el1
b_ptr1=s0*el3
ptr_shift=offset
__l3:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el1;el1=el3;el3=tmp0;break __l3}
if(comp<0){break __l3}
ptr_shift+=e1
}
b_ptr0=s0*el2
b_ptr1=s0*el3
ptr_shift=offset
__l4:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el2;el2=el3;el3=tmp0;break __l4}
if(comp<0){break __l4}
ptr_shift+=e1
}
b_ptr0=s0*el1
b_ptr1=s0*el4
ptr_shift=offset
__l5:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el1;el1=el4;el4=tmp0;break __l5}
if(comp<0){break __l5}
ptr_shift+=e1
}
b_ptr0=s0*el3
b_ptr1=s0*el4
ptr_shift=offset
__l6:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el3;el3=el4;el4=tmp0;break __l6}
if(comp<0){break __l6}
ptr_shift+=e1
}
b_ptr0=s0*el2
b_ptr1=s0*el5
ptr_shift=offset
__l7:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el2;el2=el5;el5=tmp0;break __l7}
if(comp<0){break __l7}
ptr_shift+=e1
}
b_ptr0=s0*el2
b_ptr1=s0*el3
ptr_shift=offset
__l8:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el2;el2=el3;el3=tmp0;break __l8}
if(comp<0){break __l8}
ptr_shift+=e1
}
b_ptr0=s0*el4
b_ptr1=s0*el5
ptr_shift=offset
__l9:
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
comp=data[ptr0]-data[ptr1]
if(comp>0){tmp0=el4;el4=el5;el5=tmp0;break __l9}
if(comp<0){break __l9}
ptr_shift+=e1
}
b_ptr0=s0*el1
b_ptr1=s0*el2
b_ptr2=s0*el3
b_ptr3=s0*el4
b_ptr4=s0*el5
b_ptr5=s0*index1
b_ptr6=s0*index3
b_ptr7=s0*index5
pivot_ptr=0
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
ptr2=b_ptr2+ptr_shift
ptr3=b_ptr3+ptr_shift
ptr4=b_ptr4+ptr_shift
ptr5=b_ptr5+ptr_shift
ptr6=b_ptr6+ptr_shift
ptr7=b_ptr7+ptr_shift
pivot1[pivot_ptr]=data[ptr1]
pivot2[pivot_ptr]=data[ptr3]
pivots_are_equal=pivots_are_equal&&(pivot1[pivot_ptr]===pivot2[pivot_ptr])
x=data[ptr0]
y=data[ptr2]
z=data[ptr4]
data[ptr5]=x
data[ptr6]=y
data[ptr7]=z
++pivot_ptr
ptr_shift+=d1
}
b_ptr0=s0*index2
b_ptr1=s0*left
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
data[ptr0]=data[ptr1]
ptr_shift+=d1
}
b_ptr0=s0*index4
b_ptr1=s0*right
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
data[ptr0]=data[ptr1]
ptr_shift+=d1
}
if(pivots_are_equal){
for(k=less;k<=great;++k){
ptr0=(offset+k*s0)
pivot_ptr=0
__l10:
for(i1=0;i1<n1;++i1){
comp=data[ptr0]-pivot1[pivot_ptr]
if(comp!==0){break __l10}
pivot_ptr+=f1
ptr0+=e1
}
if(comp===0){continue}
if(comp<0){
if(k!==less){
b_ptr0=s0*k
b_ptr1=s0*less
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=tmp
ptr_shift+=d1
}
}
++less
}else{
while(true){
ptr0=(offset+great*s0)
pivot_ptr=0
__l11:
for(i1=0;i1<n1;++i1){
comp=data[ptr0]-pivot1[pivot_ptr]
if(comp!==0){break __l11}
pivot_ptr+=f1
ptr0+=e1
}
if(comp>0){
great--
}else if(comp<0){
b_ptr0=s0*k
b_ptr1=s0*less
b_ptr2=s0*great
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
ptr2=b_ptr2+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=data[ptr2]
data[ptr2]=tmp
ptr_shift+=d1
}
++less
--great
break
}else{
b_ptr0=s0*k
b_ptr1=s0*great
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=tmp
ptr_shift+=d1
}
--great
break
}
}
}
}
}else{
for(k=less;k<=great;++k){
ptr0=(offset+k*s0)
pivot_ptr=0
__l12:
for(i1=0;i1<n1;++i1){
comp_pivot1=data[ptr0]-pivot1[pivot_ptr]
if(comp_pivot1!==0){break __l12}
pivot_ptr+=f1
ptr0+=e1
}
if(comp_pivot1<0){
if(k!==less){
b_ptr0=s0*k
b_ptr1=s0*less
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=tmp
ptr_shift+=d1
}
}
++less
}else{
ptr0=(offset+k*s0)
pivot_ptr=0
__l13:
for(i1=0;i1<n1;++i1){
comp_pivot2=data[ptr0]-pivot2[pivot_ptr]
if(comp_pivot2!==0){break __l13}
pivot_ptr+=f1
ptr0+=e1
}
if(comp_pivot2>0){
while(true){
ptr0=(offset+great*s0)
pivot_ptr=0
__l14:
for(i1=0;i1<n1;++i1){
comp=data[ptr0]-pivot2[pivot_ptr]
if(comp!==0){break __l14}
pivot_ptr+=f1
ptr0+=e1
}
if(comp>0){
if(--great<k){break}
continue
}else{
ptr0=(offset+great*s0)
pivot_ptr=0
__l15:
for(i1=0;i1<n1;++i1){
comp=data[ptr0]-pivot1[pivot_ptr]
if(comp!==0){break __l15}
pivot_ptr+=f1
ptr0+=e1
}
if(comp<0){
b_ptr0=s0*k
b_ptr1=s0*less
b_ptr2=s0*great
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
ptr2=b_ptr2+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=data[ptr2]
data[ptr2]=tmp
ptr_shift+=d1
}
++less
--great
}else{
b_ptr0=s0*k
b_ptr1=s0*great
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=tmp
ptr_shift+=d1
}
--great
}
break
}
}
}
}
}
}
b_ptr0=s0*left
b_ptr1=s0*(less-1)
pivot_ptr=0
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
data[ptr0]=data[ptr1]
data[ptr1]=pivot1[pivot_ptr]
++pivot_ptr
ptr_shift+=d1
}
b_ptr0=s0*right
b_ptr1=s0*(great+1)
pivot_ptr=0
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
data[ptr0]=data[ptr1]
data[ptr1]=pivot2[pivot_ptr]
++pivot_ptr
ptr_shift+=d1
}
if(((less-2)-left)<=32){
insertionSort(left,(less-2),data,offset,s0,s1,n0,n1,d1,e1,f1)
}else{
ndarrayQuickSort1d0float64(left,(less-2),data,offset,s0,s1,n0,n1,d1,e1,f1)
}
if((right-(great+2))<=32){
insertionSort((great+2),right,data,offset,s0,s1,n0,n1,d1,e1,f1)
}else{
ndarrayQuickSort1d0float64((great+2),right,data,offset,s0,s1,n0,n1,d1,e1,f1)
}
if(pivots_are_equal){
free(pivot1)
free(pivot2)
return
}
if(less<index1&&great>index5){
__l16:while(true){
ptr0=(offset+less*s0)
pivot_ptr=0
ptr_shift=offset
for(i1=0;i1<n1;++i1){
if(data[ptr0]!==pivot1[pivot_ptr]){break __l16}
++pivot_ptr
ptr0+=d1
}
++less
}
__l17:while(true){
ptr0=(offset+great*s0)
pivot_ptr=0
ptr_shift=offset
for(i1=0;i1<n1;++i1){
if(data[ptr0]!==pivot2[pivot_ptr]){break __l17}
++pivot_ptr
ptr0+=d1
}
--great
}
for(k=less;k<=great;++k){
ptr0=(offset+k*s0)
pivot_ptr=0
__l18:
for(i1=0;i1<n1;++i1){
comp_pivot1=data[ptr0]-pivot1[pivot_ptr]
if(comp_pivot1!==0){break __l18}
pivot_ptr+=f1
ptr0+=e1
}
if(comp_pivot1===0){
if(k!==less){
b_ptr0=s0*k
b_ptr1=s0*less
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=tmp
ptr_shift+=d1
}
}
++less
}else{
ptr0=(offset+k*s0)
pivot_ptr=0
__l19:
for(i1=0;i1<n1;++i1){
comp_pivot2=data[ptr0]-pivot2[pivot_ptr]
if(comp_pivot2!==0){break __l19}
pivot_ptr+=f1
ptr0+=e1
}
if(comp_pivot2===0){
while(true){
ptr0=(offset+great*s0)
pivot_ptr=0
__l20:
for(i1=0;i1<n1;++i1){
comp=data[ptr0]-pivot2[pivot_ptr]
if(comp!==0){break __l20}
pivot_ptr+=f1
ptr0+=e1
}
if(comp===0){
if(--great<k){break}
continue
}else{
ptr0=(offset+great*s0)
pivot_ptr=0
__l21:
for(i1=0;i1<n1;++i1){
comp=data[ptr0]-pivot1[pivot_ptr]
if(comp!==0){break __l21}
pivot_ptr+=f1
ptr0+=e1
}
if(comp<0){
b_ptr0=s0*k
b_ptr1=s0*less
b_ptr2=s0*great
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
ptr2=b_ptr2+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=data[ptr2]
data[ptr2]=tmp
ptr_shift+=d1
}
++less
--great
}else{
b_ptr0=s0*k
b_ptr1=s0*great
ptr_shift=offset
for(i1=0;i1<n1;++i1){
ptr0=b_ptr0+ptr_shift
ptr1=b_ptr1+ptr_shift
tmp=data[ptr0]
data[ptr0]=data[ptr1]
data[ptr1]=tmp
ptr_shift+=d1
}
--great
}
break
}
}
}
}
}
}
free(pivot1)
free(pivot2)
if((great-less)<=32){
insertionSort(less,great,data,offset,s0,s1,n0,n1,d1,e1,f1)
}else{
ndarrayQuickSort1d0float64(less,great,data,offset,s0,s1,n0,n1,d1,e1,f1)
}
}return ndarrayQuickSort1d0float64
[ [ 0, 2, 5 ],
  [ 0, 4, 0 ],
  [ 0, 4, 2 ],
  [ 0, 5, 0 ],
  [ 0, 6, 2 ],
  [ 0, 6, 6 ],
  [ 0, 7, 2 ],
  [ 0, 7, 6 ],
  [ 0, 7, 9 ],
  [ 1, 0, 3 ],
  [ 1, 0, 3 ],
  [ 1, 0, 5 ],
  [ 1, 1, 7 ],
  [ 1, 1, 8 ],
  [ 1, 2, 2 ],
  [ 1, 4, 7 ],
  [ 1, 6, 2 ],
  [ 1, 7, 0 ],
  [ 1, 8, 6 ],
  [ 1, 9, 0 ],
  [ 1, 9, 1 ],
  [ 2, 1, 1 ],
  [ 2, 2, 4 ],
  [ 2, 2, 5 ],
  [ 2, 3, 4 ],
  [ 2, 3, 6 ],
  [ 2, 3, 7 ],
  [ 2, 4, 0 ],
  [ 2, 8, 9 ],
  [ 2, 9, 3 ],
  [ 3, 0, 3 ],
  [ 3, 0, 9 ],
  [ 3, 2, 4 ],
  [ 3, 2, 4 ],
  [ 3, 2, 5 ],
  [ 3, 2, 8 ],
  [ 3, 4, 7 ],
  [ 3, 6, 6 ],
  [ 4, 1, 3 ],
  [ 4, 1, 6 ],
  [ 4, 2, 8 ],
  [ 4, 3, 3 ],
  [ 4, 3, 4 ],
  [ 4, 4, 1 ],
  [ 4, 5, 4 ],
  [ 4, 8, 1 ],
  [ 4, 9, 1 ],
  [ 4, 9, 4 ],
  [ 5, 0, 4 ],
  [ 5, 5, 3 ],
  [ 5, 6, 5 ],
  [ 5, 7, 3 ],
  [ 5, 7, 9 ],
  [ 5, 8, 5 ],
  [ 5, 8, 7 ],
  [ 5, 9, 1 ],
  [ 6, 0, 4 ],
  [ 6, 1, 4 ],
  [ 6, 2, 2 ],
  [ 6, 3, 8 ],
  [ 6, 3, 8 ],
  [ 6, 4, 0 ],
  [ 6, 4, 7 ],
  [ 6, 5, 3 ],
  [ 6, 5, 3 ],
  [ 6, 5, 5 ],
  [ 6, 6, 6 ],
  [ 6, 6, 7 ],
  [ 6, 6, 9 ],
  [ 6, 7, 7 ],
  [ 6, 8, 3 ],
  [ 6, 9, 8 ],
  [ 7, 0, 9 ],
  [ 7, 1, 0 ],
  [ 7, 1, 1 ],
  [ 7, 1, 9 ],
  [ 7, 2, 9 ],
  [ 7, 3, 4 ],
  [ 7, 4, 5 ],
  [ 7, 6, 4 ],
  [ 7, 7, 2 ],
  [ 7, 8, 3 ],
  [ 7, 8, 6 ],
  [ 7, 8, 7 ],
  [ 7, 9, 5 ],
  [ 8, 2, 4 ],
  [ 8, 3, 8 ],
  [ 8, 7, 9 ],
  [ 8, 8, 1 ],
  [ 8, 8, 3 ],
  [ 8, 8, 4 ],
  [ 8, 8, 9 ],
  [ 8, 9, 2 ],
  [ 8, 9, 5 ],
  [ 9, 0, 2 ],
  [ 9, 0, 3 ],
  [ 9, 1, 3 ],
  [ 9, 1, 4 ],
  [ 9, 1, 9 ],
  [ 9, 5, 2 ] ]
[ [ 0, 2, 5 ],
  [ 0, 4, 0 ],
  [ 0, 4, 2 ],
  [ 0, 5, 0 ],
  [ 0, 6, 2 ],
  [ 0, 6, 6 ],
  [ 0, 7, 2 ],
  [ 0, 7, 6 ],
  [ 0, 7, 9 ],
  [ 1, 0, 3 ],
  [ 1, 0, 3 ],
  [ 1, 0, 5 ],
  [ 1, 1, 7 ],
  [ 1, 1, 8 ],
  [ 1, 2, 2 ],
  [ 1, 4, 7 ],
  [ 1, 6, 2 ],
  [ 1, 7, 0 ],
  [ 1, 8, 6 ],
  [ 1, 9, 0 ],
  [ 1, 9, 1 ],
  [ 2, 1, 1 ],
  [ 2, 2, 4 ],
  [ 2, 2, 5 ],
  [ 2, 3, 4 ],
  [ 2, 3, 6 ],
  [ 2, 3, 7 ],
  [ 2, 4, 0 ],
  [ 2, 8, 9 ],
  [ 2, 9, 3 ],
  [ 3, 0, 3 ],
  [ 3, 0, 9 ],
  [ 3, 2, 4 ],
  [ 3, 2, 4 ],
  [ 3, 2, 5 ],
  [ 3, 2, 8 ],
  [ 3, 4, 7 ],
  [ 3, 6, 6 ],
  [ 4, 1, 3 ],
  [ 4, 1, 6 ],
  [ 4, 2, 8 ],
  [ 4, 3, 3 ],
  [ 4, 3, 4 ],
  [ 4, 4, 1 ],
  [ 4, 5, 4 ],
  [ 4, 8, 1 ],
  [ 4, 9, 1 ],
  [ 4, 9, 4 ],
  [ 5, 0, 4 ],
  [ 5, 5, 3 ],
  [ 5, 6, 5 ],
  [ 5, 7, 3 ],
  [ 5, 7, 9 ],
  [ 5, 8, 5 ],
  [ 5, 8, 7 ],
  [ 5, 9, 1 ],
  [ 6, 0, 4 ],
  [ 6, 1, 4 ],
  [ 6, 2, 2 ],
  [ 6, 3, 8 ],
  [ 6, 3, 8 ],
  [ 6, 4, 0 ],
  [ 6, 4, 7 ],
  [ 6, 5, 3 ],
  [ 6, 5, 3 ],
  [ 6, 5, 5 ],
  [ 6, 6, 6 ],
  [ 6, 6, 7 ],
  [ 6, 6, 9 ],
  [ 6, 7, 7 ],
  [ 6, 8, 3 ],
  [ 6, 9, 8 ],
  [ 7, 0, 9 ],
  [ 7, 1, 0 ],
  [ 7, 1, 1 ],
  [ 7, 1, 9 ],
  [ 7, 2, 9 ],
  [ 7, 3, 4 ],
  [ 7, 4, 5 ],
  [ 7, 6, 4 ],
  [ 7, 7, 2 ],
  [ 7, 8, 3 ],
  [ 7, 8, 6 ],
  [ 7, 8, 7 ],
  [ 7, 9, 5 ],
  [ 8, 2, 4 ],
  [ 8, 3, 8 ],
  [ 8, 7, 9 ],
  [ 8, 8, 1 ],
  [ 8, 8, 3 ],
  [ 8, 8, 4 ],
  [ 8, 8, 9 ],
  [ 8, 9, 2 ],
  [ 8, 9, 5 ],
  [ 9, 0, 2 ],
  [ 9, 0, 3 ],
  [ 9, 1, 3 ],
  [ 9, 1, 4 ],
  [ 9, 1, 9 ],
  [ 9, 5, 2 ] ]
TAP version 13
# ndarray-sort-2d
ok 1 flat
ok 2 flat
ok 3 flat
ok 4 flat
ok 5 flat
ok 6 flat
ok 7 flat
ok 8 flat
ok 9 flat
ok 10 flat
ok 11 flat
ok 12 flat
ok 13 flat
ok 14 flat
ok 15 flat
ok 16 flat
ok 17 flat
ok 18 flat
ok 19 flat
ok 20 flat
ok 21 flat
ok 22 flat
ok 23 flat
ok 24 flat
ok 25 flat
ok 26 flat
ok 27 flat
ok 28 flat
ok 29 flat
ok 30 flat
ok 31 flat
ok 32 flat
ok 33 flat
ok 34 flat
ok 35 flat
ok 36 flat
ok 37 flat
ok 38 flat
ok 39 flat
ok 40 flat
ok 41 flat
ok 42 flat
ok 43 flat
ok 44 flat
ok 45 flat
ok 46 flat
ok 47 flat
ok 48 flat
ok 49 flat
ok 50 flat
ok 51 flat
ok 52 flat
ok 53 flat
ok 54 flat
ok 55 flat
ok 56 flat
ok 57 flat
ok 58 flat
ok 59 flat
ok 60 flat
ok 61 flat
ok 62 flat
ok 63 flat
ok 64 flat
ok 65 flat
ok 66 flat
ok 67 flat
ok 68 flat
ok 69 flat
ok 70 flat
ok 71 flat
ok 72 flat
ok 73 flat
ok 74 flat
ok 75 flat
ok 76 flat
ok 77 flat
ok 78 flat
ok 79 flat
ok 80 flat
ok 81 flat
ok 82 flat
ok 83 flat
ok 84 flat
ok 85 flat
ok 86 flat
ok 87 flat
ok 88 flat
ok 89 flat
ok 90 flat
ok 91 flat
ok 92 flat
ok 93 flat
ok 94 flat
ok 95 flat
ok 96 flat
ok 97 flat
ok 98 flat
ok 99 flat
ok 100 flat
ok 101 flat
ok 102 flat
ok 103 flat
ok 104 flat
ok 105 flat
ok 106 flat
ok 107 flat
ok 108 flat
ok 109 flat
ok 110 flat
ok 111 flat
ok 112 flat
ok 113 flat
ok 114 flat
ok 115 flat
ok 116 flat
ok 117 flat
ok 118 flat
ok 119 flat
ok 120 flat
ok 121 flat
ok 122 flat
ok 123 flat
ok 124 flat
ok 125 flat
ok 126 flat
ok 127 flat
ok 128 flat
ok 129 flat
ok 130 flat
ok 131 flat
ok 132 flat
ok 133 flat
ok 134 flat
ok 135 flat
ok 136 flat
ok 137 flat
ok 138 flat
ok 139 flat
ok 140 flat
ok 141 flat
ok 142 flat
ok 143 flat
ok 144 flat
ok 145 flat
ok 146 flat
ok 147 flat
ok 148 flat
ok 149 flat
ok 150 flat
ok 151 flat
ok 152 flat
ok 153 flat
ok 154 flat
ok 155 flat
ok 156 flat
ok 157 flat
ok 158 flat
ok 159 flat
ok 160 flat
ok 161 flat
ok 162 flat
ok 163 flat
ok 164 flat
ok 165 flat
ok 166 flat
ok 167 flat
ok 168 flat
ok 169 flat
ok 170 flat
ok 171 flat
ok 172 flat
ok 173 flat
ok 174 flat
ok 175 flat
ok 176 flat
ok 177 flat
ok 178 flat
ok 179 flat
ok 180 flat
ok 181 flat
ok 182 flat
ok 183 flat
ok 184 flat
ok 185 flat
ok 186 flat
ok 187 flat
ok 188 flat
ok 189 flat
ok 190 flat
ok 191 flat
ok 192 flat
ok 193 flat
ok 194 flat
ok 195 flat
ok 196 flat
ok 197 flat
ok 198 flat
ok 199 flat
ok 200 flat
ok 201 flat
ok 202 flat
ok 203 flat
ok 204 flat
ok 205 flat
ok 206 flat
ok 207 flat
ok 208 flat
ok 209 flat
ok 210 flat
ok 211 flat
ok 212 flat
ok 213 flat
ok 214 flat
ok 215 flat
ok 216 flat
ok 217 flat
ok 218 flat
ok 219 flat
ok 220 flat
ok 221 flat
ok 222 flat
ok 223 flat
ok 224 flat
ok 225 flat
ok 226 flat
ok 227 flat
ok 228 flat
ok 229 flat
ok 230 flat
ok 231 flat
ok 232 flat
ok 233 flat
ok 234 flat
ok 235 flat
ok 236 flat
ok 237 flat
ok 238 flat
ok 239 flat
ok 240 flat
ok 241 flat
ok 242 flat
ok 243 flat
ok 244 flat
ok 245 flat
ok 246 flat
ok 247 flat
ok 248 flat
ok 249 flat
ok 250 flat
ok 251 flat
ok 252 flat
ok 253 flat
ok 254 flat
ok 255 flat
ok 256 flat
ok 257 flat
ok 258 flat
ok 259 flat
ok 260 flat
ok 261 flat
ok 262 flat
ok 263 flat
ok 264 flat
ok 265 flat
ok 266 flat
ok 267 flat
ok 268 flat
ok 269 flat
ok 270 flat
ok 271 flat
ok 272 flat
ok 273 flat
ok 274 flat
ok 275 flat
ok 276 flat
ok 277 flat
ok 278 flat
ok 279 flat
ok 280 flat
ok 281 flat
ok 282 flat
ok 283 flat
ok 284 flat
ok 285 flat
ok 286 flat
ok 287 flat
ok 288 flat
ok 289 flat
ok 290 flat
ok 291 flat
ok 292 flat
ok 293 flat
ok 294 flat
ok 295 flat
ok 296 flat
ok 297 flat
ok 298 flat
ok 299 flat
ok 300 flat

1..300
# tests 300
# pass  300

# ok
