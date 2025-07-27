/*
 ! 浅拷贝与深拷贝是针对引用类型而言的
 - 浅拷贝只进行一层复制，深层次的引用类型还是共享内存地址，原对象和拷贝对象还是会互相影响
 - 深拷贝就是无限层级拷贝，深拷贝后的原对象不会和拷贝对象互相影响



*/

// !引用类型赋值不是浅拷贝
// * 引用类型相互赋值
/*
 const obj = {
    name: 'jet'
}
! const newObj = obj;
obj.name = 'jelly'

*/


// * 浅拷贝
/*
?   使用 lodash 浅拷贝 clone 方法，让他们俩指向不同地址
!   import { clone } from 'lodash'

const obj = {
  name: 'jet'
}

! const newObj = clone(obj)
obj.name = 'jelly'     // 改变原来的对象

! console.log('两者指向同一地址', obj == newObj) 结果为false

? 浅拷贝只能解决一层，更深层的对象还是会指向同一地址，互相影响

const obj = {
  person: {
!    name: 'jet'
  }
}

const newObj = clone(obj)
obj.person.name = 'jelly'    // 改变原来的对象

! console.log('更深层的指向同一地址', obj.person == newObj.person) true

*/

// * 深拷贝
/*
!    import { cloneDeep } from 'lodash'

const obj = {
  person: {
    name: 'jet'
  }
}

! const newObj = cloneDeep(obj)
obj.person.name = 'jelly' // 改变原来的对象

! console.log('更深层的对象指向同一地址', obj.person == newObj.person) false
*/


// TODO 实现浅拷贝:遍历原对象  Object.assign、数组的slice和concate、数组静态方法 Array.from、扩张运算符

//只考虑对象类型 
//* 遍历原对象
function shallowCopy(obj) {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}


//测试用例
const obj = {
  name: 'jet',
  person: {
    nickName: 'j3t'
  }
}

let newObj = shallowCopy(obj)
//* Object.assign
newObj = Object.assign({}, obj);

obj.name = 'jelly'
obj.person.nickName = 'j3lly'

console.log('obj ', obj);
console.log('newObj ', newObj);

//* slice concat Array.from 扩展运算符
const arr = ['jet', 'j3t', 'soda', 'chen'];
let newArr = arr.slice(0);
arr[1] = 'j3lly';
newArr = [].concat(arr);
arr[0] = 'jelly'
newArr = Array.from(arr);
arr[2] = 's0d4';
newArr = [...arr];
arr[3] = 'ch3n'
console.log(newArr);

